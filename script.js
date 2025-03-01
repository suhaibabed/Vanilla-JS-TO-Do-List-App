let tasks = [
  {
    title: "قراءة كتاب",
    date: "12/02/2025",
    isDone: false,
  },
  {
    title: "انجاز مشروع To Do",
    date: "12/02/2025",
    isDone: false,
  },
  {
    title: "مراجعة حافا سكريبت",
    date: "12/02/2025",
    isDone: true,
  },
];

function getTaskFromStorage(){
  let retrievedTask = JSON.parse(localStorage.getItem("tasks"))
   tasks = retrievedTask ?? []
}
getTaskFromStorage()
function addTaskOnThePage() {
  document.getElementById("tasks").innerHTML = "";
  let index = 0;
  for (let task of tasks) {
    let content = `
    <div class='Task ${task.isDone ? "done" : ""} '>
      <div class='tasks-info'>
        <h2>${task.title}</h2>
        <div>
        <i class="material-icons">event</i>
          <span> ${task.date} </span>
        </div>
      </div>
      <div class='task-action'>
        <button onclick="deleteTask(${index})"
          class='circle'
          style='background-color: rgb(114, 0, 0); color: white'>
           <i class="material-icons">delete</i> 
        </button>
        ${
          task.isDone
            ? `
             <button
        onclick="ToggleTaskCompletion(${index})"
          class='circle'
          style='background-color: rgb(118, 0, 102); color: white'>
           <i class="material-icons">cancel</i>
        </button>
          `
            : `
             <button
        onclick="ToggleTaskCompletion(${index})"
          class='circle'
          style='background-color: rgb(0, 150, 30); color: white'>
           <i class="material-icons">done</i>
        </button>

          `
        }
       
        <button onclick="editTaskTitle(${index})"
          class='circle'
          style='background-color: rgba(0, 16, 197, 0.692); color: white'>
           <i class="material-icons">edit</i> 
        </button>
      </div>
    </div>
  `;
    document.getElementById("tasks").innerHTML += content;
    index++;
  }
}
addTaskOnThePage();
document.getElementById("add-btn").addEventListener("click", function () {
  let now = new Date();
  let date =
    now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
  let taskName = prompt("الرجاء إدخال عنوان المهمة");
  let taskObj = {
    title: taskName,
    date: date,
    isDone: false,
  };
  tasks.push(taskObj);
  storeTasks()
  addTaskOnThePage();
});
function deleteTask(index) {
  let task = tasks[index];
  let isConfirmed = confirm(" : هل تريد حذف" + " " + task.title);

  if (isConfirmed) {
    tasks.splice(index, 1);
    storeTasks()
    addTaskOnThePage();
  }
}
function editTaskTitle(index) {
  let newTask = tasks[index];
  let newTaskTitle = prompt("الرجاء تحديد عنوان المهمة الجديدة", newTask.title);
  newTask.title = newTaskTitle;
  storeTasks()
  addTaskOnThePage();
}

function ToggleTaskCompletion(index) {
  let task = tasks[index];
  task.isDone = !task.isDone;
  storeTasks()
  addTaskOnThePage();
}
// ====== localStorage =====
function storeTasks() {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
}
