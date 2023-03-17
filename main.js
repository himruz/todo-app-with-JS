let form = document.getElementById("form"),
  task = document.getElementById("tasks"),
  taskTitle = document.getElementById("textInput"),
  taskDate = document.getElementById("dateInput"),
  addBtn = document.getElementById("addBtn"),
  taskDesc = document.getElementById("textarea");
let datas = JSON.parse(localStorage.getItem("data"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation(e);
});

const formValidation = (formInfo) => {
  let taskTitle = formInfo.target.taskTitle.value;
  const errorMsg = document.getElementById("msg");
  if (taskTitle == "") {
    errorMsg.innerText = "You can't left task empty";
    taskTitle = "";
  } else {
    storeData();
    errorMsg.innerText = "";
    addBtn.setAttribute("data-bs-dismiss", "modal");
    addBtn.click();

    (() => {
      addBtn.removeAttribute("data-bs-dismiss");
    })();
  }
};

const storeData = () => {
  if (!datas) {
    datas = [];
  }
  datas.push({
    name: taskTitle.value,
    date: taskDate.value,
    desc: taskDesc.value,
  });
  localStorage.setItem("data", JSON.stringify(datas));

  createTaks();
};

const createTaks = () => {
  let li = "";
  if (datas) {
    datas.map((data, index) => {
      return (li += `
      <div id=${index}>
        <span class="fw-bold">${data.name}</span>
        <span class="small text-secondary">${data.date}</span>
        <p>${data.desc}</p>
  
        <span class="options">
          <i onclick='editTask(this)' data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onclick='deleteTask(this)' class="fas fa-trash-alt"></i>
        </span>
      </div> 
  `);
    });
  }

  task.innerHTML = li || "No Task To DO";

  resetForm();
};

const resetForm = () => {
  taskTitle.value = "";
  taskDate.value = "";
  taskDesc.value = "";
};

const editTask = (element) => {
  let selectedTask = element.parentElement.parentElement;
  taskTitle.value = selectedTask.children[0].innerHTML;
  taskDate.value = selectedTask.children[1].innerHTML;
  taskDesc.value = selectedTask.children[2].innerHTML;
  deleteTask(element);
};

const deleteTask = (element) => {
  let id = element.parentElement.parentElement.id;
  datas.splice(id, 1);
  localStorage.setItem("data", JSON.stringify(datas));

  createTaks();
};

createTaks();