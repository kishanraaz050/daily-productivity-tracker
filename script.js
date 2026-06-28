// Today's Date
const date = document.getElementById("date");
date.innerText = new Date().toDateString();

// Elements
const progressBar = document.querySelector("progress");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const completedText = document.getElementById("completed");

const addTaskBtn = document.getElementById("addTask");
const newTaskInput = document.getElementById("newTask");
const taskList = document.getElementById("taskList");

const checkScoreBtn = document.getElementById("checkScore");

// Progress Update Function
function updateProgress() {

    const allCheckboxes =
        document.querySelectorAll('input[type="checkbox"]');

    let completed = 0;

    allCheckboxes.forEach((box) => {
        if (box.checked) {
            completed++;
        }
    });

    const total = allCheckboxes.length;

    completedText.innerText =
        `Completed: ${completed}/${total}`;

    progressBar.max = total;
    progressBar.value = completed;

    const score =
        total === 0 ? 0 :
        Math.round((completed / total) * 10);

    checkScoreBtn.addEventListener("click", () => {

    updateProgress();

    scoreText.style.display = "block";
    message.style.display = "block";

    const allCheckboxes =
        document.querySelectorAll('input[type="checkbox"]');

    let completed = 0;

    allCheckboxes.forEach(box => {
        if(box.checked) completed++;
    });

    const score =
        Math.round((completed / allCheckboxes.length) * 10);

    scoreText.innerText = `${score}/10`;

    if (score >= 8) {
        message.innerText = "Excellent 🔥";
    }
    else if (score >= 5) {
        message.innerText = "Good Job 👍";
    }
    else {
        message.innerText = "Keep Going 💪";
    }
});
}

// Add Event To Existing Checkboxes
document.querySelectorAll('input[type="checkbox"]')
.forEach((box) => {
    box.addEventListener("change", updateProgress);
});

// Check Score Button
checkScoreBtn.addEventListener("click", updateProgress);

// Add Custom Task
addTaskBtn.addEventListener("click", () => {

    const taskText = newTaskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskDiv = document.createElement("div");
    taskDiv.style.marginTop = "10px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const label = document.createElement("label");
    label.innerText = " " + taskText;

    checkbox.addEventListener("change", updateProgress);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);

    taskList.appendChild(taskDiv);

    newTaskInput.value = "";

    updateProgress();
});

// Enter Key Support
newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

// Initial Load
updateProgress();