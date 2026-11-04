

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

    document.getElementById("output").textContent = result.yaml;
});
