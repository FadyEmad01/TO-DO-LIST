const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

let taskName = document.getElementById("taskName");
let description = document.getElementById("description");
let image = document.getElementById("image");
let tableData = document.getElementById("tableData");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let deleteAllBtn = document.getElementById("deleteAllBtn");
let showOneModel = document.getElementById("model2-content");
let taskNameUpdate = document.getElementById("taskName-update");
let descriptionUpdate = document.getElementById("description-update");
let imageUpdate = document.getElementById("image-update");
let taskId;

//////localStorge////////
LocalTaskSave = JSON.parse(localStorage.getItem("allTasks")) || [];
////////////////////////

//////create////////
function create() {
  let allTasks = {
    name: taskName.value,
    description: description.value,
    img: image.value,
  };
  LocalTaskSave.push(allTasks);

  localStorage.setItem("allTasks", JSON.stringify(LocalTaskSave));
  clearInput();
  show();
}

addBtn.addEventListener("click", create);
//////show-all////////
function show() {
  table = "";

  for (let i = 0; i < LocalTaskSave.length; i++) {
    taskId = i;
    table += `<table class="table table-hover" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onclick="showOne(${taskId})">
        <tbody class="">
          <tr class="">
            <th class="th-left col-1" scope="col">${i + 1}</th>
            <th class="col-3 text-truncate nameClass" style="max-width: 100px;" scope="col">${
              LocalTaskSave[i]?.name
            }</th>
            <th class="col-4 text-truncate desClass" style="max-width: 100px;" scope="col">${
              LocalTaskSave[i]?.description
            }</th>
            <th class="th-right col-3" scope="col">
              <img class="imgClass" src="${LocalTaskSave[i]?.img}" alt="Error">
            </th>
          </tr>
        </tbody>
      </table>`;
  }
  tableData.innerHTML = table;
}

show();



//////clear-input////////
function clearInput() {
  taskName.value = "";
  description.value = "";
  image.value = "";
}

//////delete-all////////
function deleteAll() {
  localStorage.clear();
  LocalTaskSave.splice(0);
  show();
}

deleteAllBtn.addEventListener("click", deleteAll);

//////show-one////////

function showOne(i) {
  showOneModel.innerHTML = `<div class="modal-header">
<h1 class="modal-title fs-5" id="staticBackdropLabel">Show Task</h1>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body" id="model2">
<div class="card">
  <img src="${LocalTaskSave[i]?.img}" class="card-img-top" alt="...">
  <div class="card-body">
      <h5 class="card-title">${LocalTaskSave[i]?.name}</h5>
      <p class="card-text">${LocalTaskSave[i]?.description}</p>
  </div>
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-outline-danger" id="delOneBtn"
    data-bs-dismiss="modal" onclick="deleteOne(${i})">Delete</button>
<button type="button" class="btn btn-outline-warning" data-bs-toggle="modal"
    id="addBtn" onclick="updateOne(${i})" data-bs-toggle="modal"
    data-bs-target="#staticBackdrop3">Edit</button>
</div>`;
}

//////Delete-one////////

function deleteOne(i) {
  LocalTaskSave.splice(i, 1);
  localStorage.setItem("allTasks", JSON.stringify(LocalTaskSave));
  show();
}

//////Update-one////////

// function updateOne(i) {
//   taskNameUpdate.value = LocalTaskSave[i].name;
//   descriptionUpdate.value = LocalTaskSave[i].description;
//   imageUpdate.value = LocalTaskSave[i].img;
//   updateBtn.addEventListener('click' , ()=>{
//     LocalTaskSave[i].name = taskNameUpdate.value;
//     LocalTaskSave[i].description = descriptionUpdate.value;
//     LocalTaskSave[i].img = imageUpdate.value;
//     localStorage.setItem("allTasks", JSON.stringify(LocalTaskSave));
//     show();
//   });
// }

//////edit-one////////

// function edit(i){


//   show();
// }

// updateBtn.addEventListener('click' , edit);



function updateOne(i) {
  taskNameUpdate.value = LocalTaskSave[i].name;
  descriptionUpdate.value = LocalTaskSave[i].description;
  imageUpdate.value = LocalTaskSave[i].img;
  
  // Define a new function within updateOne to capture the value of i
  function updateTask() {
    LocalTaskSave[i].name = taskNameUpdate.value;
    LocalTaskSave[i].description = descriptionUpdate.value;
    LocalTaskSave[i].img = imageUpdate.value;
    localStorage.setItem("allTasks", JSON.stringify(LocalTaskSave));
    show();
  }
  
  // Add event listener to call the updateTask function
  updateBtn.addEventListener('click' , updateTask);
}