document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    document.querySelectorAll(".task-list").forEach(list => {
        list.addEventListener("dragover", allowDrop);
        list.addEventListener("drop", drop);
    });

    document.querySelectorAll(".task").forEach(task => {
        makeTaskDraggable(task);
    });
});

function allowDrop(event) {
    event.preventDefault();
}

function makeTaskDraggable(task) {
    task.setAttribute("draggable", "true");
    task.addEventListener("dragstart", drag);
}

var draggedTask = null;

function drag(event) {
    draggedTask = event.target;
    event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
    event.preventDefault();

    var dropTarget = event.target.closest(".task-list");

    if (dropTarget && draggedTask) {
        dropTarget.appendChild(draggedTask);
        saveTasks();
    }

    draggedTask = null;
}

function saveTasks() {
    var taskData = {};

    document.querySelectorAll(".task-list").forEach(list => {
        var columnId = list.parentElement.id;
        taskData[columnId] = Array.from(list.children).map(task => task.id);
    });

    localStorage.setItem("kanbanTasks", JSON.stringify(taskData));
}

function loadTasks() {
    var savedData = localStorage.getItem("kanbanTasks");

    if (savedData) {
        var taskData = JSON.parse(savedData);

        Object.keys(taskData).forEach(columnId => {
            var column = document.getElementById(columnId);
            var list = column ? column.querySelector(".task-list") : null;
            if (list) {
                taskData[columnId].forEach(taskId => {
                    var task = document.getElementById(taskId);
                    if (task) {
                        list.appendChild(task);
                        makeTaskDraggable(task);
                    }
                });
            }
        });
    }
}
