# === MAIN IMPORTS ===
from flask import Flask, request, jsonify, send_file  # type: ignore
from jsonschema import validate, ValidationError  # type: ignore
from jinja2 import Environment, FileSystemLoader  # type: ignore
from flask_jwt_extended import JWTManager, create_access_token, jwt_required  # type: ignore
from flask_cors import CORS  # type: ignore
import json
import os
import io
import zipfile


# === APP SETUP ===
app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "supersecret-key"  # Replace with something stronger in production
jwt = JWTManager(app)


# === SCHEMA & TEMPLATES ===
with open("schema.json") as schema_file:
    schema = json.load(schema_file)

env = Environment(loader=FileSystemLoader("template"))


# === ROUTES ===
@app.route("/login", methods=["POST"])
def login():
    creds = request.get_json()
    username = creds.get("username")
    password = creds.get("password")

    # Simple hardcoded login
    if username == "admin" and password == "admin123":
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)

    return jsonify({"msg": "Credenziali non valide"}), 401


@app.route("/interpret", methods=["POST"])
@jwt_required()
def interpret():
    try:
        config = request.get_json()
        validate(instance=config, schema=schema)
    except ValidationError as exc:
        return jsonify({"errors": [{"message": exc.message}]}), 400
    except Exception as exc:  # pragma: no cover - defensive fallback
        return jsonify({"errors": [{"message": str(exc)}]}), 400

    # Apply templates
    config_bbappend = env.get_template("config.bbappend.j2").render(config=config)
    local_conf = env.get_template("local.conf.j2").render(config=config)
    fragment_conf = env.get_template("fragment.conf.j2").render(config=config)

    # Build an in-memory ZIP archive
    memory_file = io.BytesIO()
    with zipfile.ZipFile(memory_file, "w") as archive:
        archive.writestr("config.bbappend", config_bbappend)
        archive.writestr("local.conf", local_conf)
        archive.writestr("fragment.conf", fragment_conf)

    memory_file.seek(0)

    return send_file(
        memory_file,
        mimetype="application/zip",
        as_attachment=True,
        download_name="yocto-config.zip",
    )


if __name__ == "__main__":
    # === ENTRYPOINT ===
    port = int(os.environ.get("PORT", 5000))  # Use Render's PORT, default to 5000
    app.run(host="0.0.0.0", port=port)
