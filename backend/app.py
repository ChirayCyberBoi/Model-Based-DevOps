from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Model-Based DevOps Workflow Generator is running!"

if __name__ == "__main__":
    app.run(debug=True)