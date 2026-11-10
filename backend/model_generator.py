
import json


ALLOWED_STAGES = [
    "Source Code",
    "Build",
    "Testing",
    "Deployment"
]


def validate_workflow(name, stages):

    errors = []

    # Validate workflow name
    if not isinstance(name, str) or not name.strip():
        errors.append("Workflow name cannot be empty.")

    elif len(name.strip()) > 50:
        errors.append("Workflow name cannot exceed 50 characters.")

    # Validate stages
    if not isinstance(stages, list) or not stages:
        errors.append("Select at least one pipeline stage.")

    else:
        if len(stages) != len(set(stages)):
            errors.append("Duplicate stages are not allowed.")

        for stage in stages:
            if stage not in ALLOWED_STAGES:
                errors.append(f"Invalid stage: {stage}")

    return errors


def create_workflow(name, stages):

    workflow = {
        "name": name.strip(),
        "stages": stages
    }

    return workflow


if __name__ == "__main__":

    workflow = create_workflow(
        "My First Pipeline",
        ["Source Code", "Build", "Testing", "Deployment"]
    )

    print(json.dumps(workflow, indent=4))
