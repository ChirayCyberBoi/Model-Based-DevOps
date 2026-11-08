
from flask import Flask, request, jsonify, send_from_directory
from model_generator import create_workflow, validate_workflow
from pipeline_generator import generate_pipeline

app = Flask(
    __name__,
    static_folder="../frontend",
    static_url_path=""
)


@app.route("/")
def home():
    return send_from_directory("../frontend", "index.html")


@app.route("/generate", methods=["POST"])
def generate():

    data = request.json

    name = data.get("name")
    stages = data.get("stages")

    errors = validate_workflow(name, stages)

if errors:
    return jsonify({
        "errors": errors
    }), 400

workflow = create_workflow(name, stages)

yaml_output = generate_pipeline(workflow)

    return jsonify({
        "workflow": workflow,
        "yaml": yaml_output
    })


if __name__ == "__main__":
    app.run(debug=True)
