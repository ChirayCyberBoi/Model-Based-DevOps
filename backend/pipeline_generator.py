
import yaml


def generate_pipeline(workflow):

    steps = []

    for stage in workflow["stages"]:

        if stage == "Source Code":
            steps.append({
                "name": "Checkout Source Code",
                "uses": "actions/checkout@v4"
            })

        elif stage == "Build":
            steps.append({
                "name": "Build Project",
                "run": "echo Building project..."
            })

        elif stage == "Testing":
            steps.append({
                "name": "Run Tests",
                "run": "echo Running tests..."
            })

        elif stage == "Deployment":
            steps.append({
                "name": "Deploy Project",
                "run": "echo Deploying project..."
            })

    pipeline = {
        "name": workflow["name"],
        "on": ["push"],
        "jobs": {
            "build-and-test": {
                "runs-on": "ubuntu-latest",
                "steps": steps
            }
        }
    }

    return yaml.dump(pipeline, sort_keys=False)


if __name__ == "__main__":
    from model_generator import create_workflow

    workflow = create_workflow(
        "My First Pipeline",
        ["Source Code", "Build", "Testing", "Deployment"]
    )

    yaml_output = generate_pipeline(workflow)

    print(yaml_output)
