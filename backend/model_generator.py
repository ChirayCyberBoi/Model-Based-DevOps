import json
def create_workflow(name, stages):
    workflow = {
        "name": name,
        "stages": stages
    }

    return workflow


if __name__ == "__main__":
    workflow = create_workflow(
        "My First Pipeline",
        ["Source Code", "Build", "Testing", "Deployment"]
    )

    print(json.dumps(workflow, indent=4))