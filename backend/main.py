from flask import Flask, request, jsonify # type: ignore
from jsonschema import validate, ValidationError # type: ignore
from jinja2 import Environment, FileSystemLoader # type: ignore
import json
import os
import io
import zipfile
from flask import send_file # type: ignore
from flask_jwt_extended import JWTManager, create_access_token, jwt_required # type: ignore
from flask_cors import CORS # type: ignore


app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "supersegreta"  # Puoi cambiarla con qualcosa di più robusto
jwt = JWTManager(app)

# Carica schema JSON
with open("schema.json") as f:
    schema = json.load(f)

# Inizializza Jinja2
env = Environment(loader=FileSystemLoader("template"))

@app.route("/login", methods=["POST"])
def login():
    creds = request.get_json()
    username = creds.get("username")
    password = creds.get("password")

    # Login hardcoded semplice
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
    except ValidationError as e:
        return jsonify({"errors": [{"message": e.message}]}), 400
    except Exception as e:
        return jsonify({"errors": [{"message": str(e)}]}), 400

    # Applica template
    config_bbappend = env.get_template("config.bbappend.j2").render(config=config)
    local_conf = env.get_template("local.conf.j2").render(config=config)
    fragment_conf =  env.get_template("fragment.conf.j2").render(config=config)

        # Crea archivio ZIP in memoria
    memory_file = io.BytesIO()
    with zipfile.ZipFile(memory_file, 'w') as zf:
        zf.writestr('config.bbappend', config_bbappend)
        zf.writestr('local.conf', local_conf)
        zf.writestr('fragment.conf', fragment_conf)

    memory_file.seek(0)

    return send_file(
        memory_file,
        mimetype='application/zip',
        as_attachment=True,
        download_name='yocto-config.zip'
    )


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))  # usa PORT di Render, fallback a 5000
    app.run(host="0.0.0.0", port=port)