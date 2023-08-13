// BOM Challing

let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// emty array
let arryOfTaskes = [];

// sheck if there is Tasks in the storage
if (localStorage.getItem("tasks")) {
  arryOfTaskes = JSON.parse(localStorage.getItem("tasks"));
}

// tereger getDataFromLOcal function
getDataFromLOcal();

// add task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = ""; // Emtey the input
  }
};

// click on element
tasksDiv.addEventListener("click", (e) => {
  // Delet Botton
  if (e.target.classList.contains("del")) {
    deleteWithId(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  // done
  if (e.target.classList.contains("task")) {
    toggelCompelet(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // add task
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arryOfTaskes.push(task);
  // add taskes to the page
  addElementsToPage(arryOfTaskes);
  // locale storage
  addToLocal(arryOfTaskes);
}

function addElementsToPage(arryOfTaskes) {
  // Emtey tasks div
  tasksDiv.innerHTML = "";
  // looping in the array of tasks
  arryOfTaskes.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addToLocal(arryOfTaskes) {
  window.localStorage.setItem("tasks", JSON.stringify(arryOfTaskes));
}

function getDataFromLOcal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPage(tasks);
  }
}

function deleteWithId(taskId) {
  arryOfTaskes = arryOfTaskes.filter((task) => task.id != taskId);
  addToLocal(arryOfTaskes);
}

function toggelCompelet(taskId) {
  for (let i = 0; i < arryOfTaskes.length; i++) {
    if (arryOfTaskes[i].id == taskId) {
      arryOfTaskes[i].completed == false
        ? (arryOfTaskes[i].completed = true)
        : (arryOfTaskes[i].completed = false);
    }
  }
  addToLocal(arryOfTaskes);
}
