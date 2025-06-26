from flask import Flask, request, jsonify
from jsonschema import validate, ValidationError
from jinja2 import Environment, FileSystemLoader
import json
import os

app = Flask(__name__)

# Carica schema JSON
with open("schema.json") as f:
    schema = json.load(f)

# Inizializza Jinja2
env = Environment(loader=FileSystemLoader("template"))

@app.route("/interpret", methods=["POST"])
def interpret():
    try:
        config = request.get_json()
        validate(instance=config, schema=schema)
    except ValidationError as e:
        return jsonify({"errors": [{"message": e.message}]}), 400
    except Exception as e:
        return jsonify({"errors": [{"message": str(e)}]}), 400

    # Applica template
    template = env.get_template("config.bbappend.j2")
    output = template.render(config=config)

    # Restituisce un file come dizionario: nome → contenuto
    return jsonify({
        "config.bbappend": output
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
