var newTask = document.getElementById("new-task");
var addButton = document.getElementById("add-button");
var incompleteTasks = document.getElementById("incomplete-tasks");
var completeTasks = document.getElementById("completed-tasks");

addButton.addEventListener("click", addTask);

function addTask() {
	var task = newTask.value.trim();
	if (task !== "") {
		var listItem = document.createElement("li");
		listItem.className = "mdl-list__item";
		listItem.innerHTML = `
            <span class="mdl-list__item-primary-content">${task}</span>
            <span class="mdl-list__item-secondary-content">
                <span class="mdl-list__item-secondary-info">Date: ${getCurrentDate()}</span>
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon complete-task">
                    <i class="material-icons">done</i>
                </button>
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon delete-task">
                    <i class="material-icons">delete</i>
                </button>
            </span>`;
		incompleteTasks.appendChild(listItem);
		newTask.value = "";

		// Attach event listeners for completion and deletion
		var completeButton = listItem.querySelector(".complete-task");
		var deleteButton = listItem.querySelector(".delete-task");
		completeButton.addEventListener("click", completeTask);
		deleteButton.addEventListener("click", deleteTask);
	}
}

function completeTask(event) {
	var listItem = event.target.closest("li");
	listItem.querySelector(".mdl-list__item-primary-content").style.textDecoration = "line-through";
	var dateInfo = listItem.querySelector(".mdl-list__item-secondary-info");
	dateInfo.innerHTML += ` - Completed on: ${getCurrentDate()}`;
	completeTasks.appendChild(listItem);

	// Remove complete button and event listener
	var completeButton = listItem.querySelector(".complete-task");
	completeButton.parentNode.removeChild(completeButton);
}

function deleteTask(event) {
	var listItem = event.target.closest("li");
	listItem.parentNode.removeChild(listItem);
}

function getCurrentDate() {
	var now = new Date();
	var day = now.getDate();
	var month = now.getMonth() + 1;
	var year = now.getFullYear();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
