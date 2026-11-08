
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

