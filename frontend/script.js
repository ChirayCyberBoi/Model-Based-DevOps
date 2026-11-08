
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
});


