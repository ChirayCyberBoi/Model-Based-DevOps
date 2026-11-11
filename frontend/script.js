
let generatedYAML = "";

document.getElementById("createWorkflow").addEventListener("click", async function () {

    const name = document.getElementById("workflowName").value;

    const checkboxes = document.querySelectorAll(
        '.workflow-form input[type="checkbox"]:checked'
    );

    const stages = Array.from(checkboxes).map(
        checkbox => checkbox.value
    );

    const response = await fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            stages: stages
        })
    });

    const result = await response.json();

if (!response.ok) {

    document.getElementById("output").textContent =
        result.errors.join("\n");

    document.getElementById("downloadWorkflow").style.display = "none";

    generatedYAML = "";

    return;
}

generatedYAML = result.yaml;

    document.getElementById("output").textContent = generatedYAML;

    document.getElementById("downloadWorkflow").style.display = "inline-block";
});


document.getElementById("downloadWorkflow").addEventListener("click", function () {

    const blob = new Blob([generatedYAML], {
        type: "text/yaml"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "workflow.yml";

    link.click();

    URL.revokeObjectURL(url);
});

document.getElementById("stageList").addEventListener("click", function (event) {

    const row = event.target.closest(".stage-item");

    if (!row) return;

    if (event.target.classList.contains("move-up")) {

        const previous = row.previousElementSibling;

        if (previous) {
            row.parentNode.insertBefore(row, previous);
        }

    }

    if (event.target.classList.contains("move-down")) {

        const next = row.nextElementSibling;

        if (next) {
            row.parentNode.insertBefore(next, row);
        }

    }
        if (event.target.classList.contains("remove-stage")) {
        row.remove();
    }
});
function updatePipelinePreview() {

    const preview = document.getElementById("pipelinePreview");

    const checkboxes = document.querySelectorAll(
        "#stageList input[type='checkbox']:checked"
    );

    preview.innerHTML = "";

    if (checkboxes.length === 0) {
        preview.textContent = "No stages selected.";
        return;
    }

    checkboxes.forEach((checkbox, index) => {

        const stage = document.createElement("div");
        stage.className = "stage";
        stage.textContent = checkbox.value;

        preview.appendChild(stage);

        if (index < checkboxes.length - 1) {
            const arrow = document.createElement("span");
            arrow.textContent = "→";
            preview.appendChild(arrow);
        }

    });
}


// Update when stages are selected or unchecked
document.getElementById("stageList").addEventListener(
    "change",
    updatePipelinePreview
);

// Update after moving or removing stages
document.getElementById("stageList").addEventListener(
    "click",
    function () {
        setTimeout(updatePipelinePreview, 0);
    }
);

// Update after adding a stage
document.getElementById("addStage").addEventListener(
    "click",
    function () {
        setTimeout(updatePipelinePreview, 0);
    }
);

// Initial preview
updatePipelinePreview();


