
let generatedYAML = "";
let generatedJSON = "";

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
    document.getElementById("copyWorkflow").style.display = "none";
    document.getElementById("downloadJSON").style.display = "none";
generatedJSON = "";

    generatedYAML = "";
    generatedJSON = JSON.stringify(result.workflow, null, 4);

    return;
}

generatedYAML = result.yaml;
    generatedJSON = JSON.stringify(result.workflow, null, 4);
    // Save workflow in browser history
let history = JSON.parse(
    localStorage.getItem("workflowHistory") || "[]"
);

history.unshift({
    name: result.workflow.name,
    stages: result.workflow.stages,
    yaml: result.yaml,
    date: new Date().toLocaleString()
});

// Keep only the latest 10 workflows
history = history.slice(0, 10);

localStorage.setItem("workflowHistory", JSON.stringify(history));
    document.getElementById("output").textContent = generatedYAML;

    document.getElementById("downloadWorkflow").style.display = "inline-block";
    document.getElementById("copyWorkflow").style.display = "inline-block";
    document.getElementById("downloadJSON").style.display = "inline-block";
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
document.getElementById("copyWorkflow").addEventListener("click", async function () {

    if (!generatedYAML) {
        return;
    }

    try {
        await navigator.clipboard.writeText(generatedYAML);
        alert("YAML copied successfully!");
    } catch (error) {
        alert("Unable to copy YAML.");
    }

});
document.getElementById("downloadJSON").addEventListener("click", function () {

    if (!generatedJSON) {
        alert("Please generate a workflow first.");
        return;
    }

    const blob = new Blob([generatedJSON], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "workflow-model.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1000);
});
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light Mode";
}

// Switch theme when clicked
themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Dark Mode";
    }

});

