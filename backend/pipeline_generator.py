import yaml


def generate_pipeline(workflow):
    pipeline = {
        "name": workflow["name"],
        "on": ["push"],
        "jobs": {
            "build-and-test": {
                "runs-on": "ubuntu-latest",
                "steps": [
                    {
                        "name": "Checkout code",
                        "uses": "actions/checkout@v4"
                    },
                    {
                        "name": "Run workflow",
                        "run": "echo Pipeline executed successfully!"
                    }
                ]
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