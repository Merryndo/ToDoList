function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskValue = taskInput.value;

    if (taskValue !== "") {
        const taskList = document.getElementById("taskList");
        const newTask = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = taskValue;
        taskText.className = "task-text";

        // Add the current date and time
        const taskDate = document.createElement("span");
        const currentDate = new Date();
        taskDate.textContent = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();
        taskDate.className = "task-date";

        // Add priority selection
        const prioritySelect = document.createElement("select");
        prioritySelect.className = "priority-select";

        const highPriorityOption = document.createElement("option");
        highPriorityOption.value = "high";
        highPriorityOption.textContent = "Alta";
        highPriorityOption.selected = true; // Add this line
        prioritySelect.appendChild(highPriorityOption);

        const mediumPriorityOption = document.createElement("option");
        mediumPriorityOption.value = "medium";
        mediumPriorityOption.textContent = "Media";
        prioritySelect.appendChild(mediumPriorityOption);

        const lowPriorityOption = document.createElement("option");
        lowPriorityOption.value = "low";
        lowPriorityOption.textContent = "Baja";
        prioritySelect.appendChild(lowPriorityOption);

        const noPriorityOption = document.createElement("option");
        noPriorityOption.value = "none";
        noPriorityOption.textContent = "Ninguna";
        prioritySelect.appendChild(noPriorityOption);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&#10060;";
        deleteButton.className = "delete-btn";

        let editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.className = "edit-btn";

        deleteButton.addEventListener("click", function () {
            taskList.removeChild(newTask);
        });

        taskText.addEventListener("click", function () {
            taskText.classList.toggle("completed");
        });

        editButton.addEventListener("click", function() {
            editTask(newTask);
        });

        newTask.appendChild(taskText);
        newTask.appendChild(taskDate); // Add the date span to the task
        newTask.appendChild(prioritySelect);//priority for the task
        
        newTask.appendChild(editButton);
        newTask.appendChild(deleteButton);
        taskList.appendChild(newTask);

        taskInput.value = "";

        // Update task priority color
        updatePriorityColor(newTask);

        // Add an event listener to the priority select element
        prioritySelect.addEventListener("change", function() {
            updatePriorityColor(newTask);
        });
    } else {
        alert("Por favor ingrese una tarea");
    }
}
function updatePriorityColor(taskElement) {

    const prioritySelect = taskElement.querySelector(".priority-select");

    const priorityValue = prioritySelect.value;


    switch (priorityValue) {

        case "high":

            taskElement.style.backgroundColor = "red";

            break;

        case "medium":

            taskElement.style.backgroundColor = "orange";

            break;

        case "low":

            taskElement.style.backgroundColor = "green";

            break;

        case "none":

            taskElement.style.backgroundColor = "white";

            break;

        default:

            taskElement.style.backgroundColor = "white";

    }

}

function editTask(taskItem) {
    const taskText = taskItem.querySelector(".task-text");
    const currentTask = taskText.textContent;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentTask;
    editInput.className = "edit-input"; // Aplicar la clase para el estilo

    const saveButton = document.createElement("button");
    saveButton.textContent = "Guardar";
    saveButton.className = "save-btn";

    taskItem.innerHTML = "";
    taskItem.appendChild(editInput);
    taskItem.appendChild(saveButton);

    const newEditButton = document.createElement("button");
    newEditButton.textContent = "Editar";
    newEditButton.className = "edit-btn";

    const newDeleteButton = document.createElement("button");
    newDeleteButton.innerHTML = "&#10060;";
    newDeleteButton.className = "delete-btn";

    taskItem.appendChild(newEditButton);
    taskItem.appendChild(newDeleteButton);

    saveButton.addEventListener("click", function() {
        const newText = editInput.value.trim();
        if (newText) {
            taskText.textContent = newText;
        }
        taskItem.innerHTML = "";
        taskItem.appendChild(taskText);
        taskItem.appendChild(newEditButton);
        taskItem.appendChild(newDeleteButton);

        newEditButton.addEventListener("click", function() {
            editTask(taskItem);
        });
        newDeleteButton.addEventListener("click", function() {
            taskItem.parentNode.removeChild(taskItem);
        });
    });
}

document.getElementById("addTaskButton").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


////////////////////////////////////////////////
// codigo hecho por la profesora
// AÑADIR, ELIMINAR Y TACHAR TAREAS
 
// function addTask() {
//     const taskInput = document.getElementById("taskInput");
//     console.log(taskInput);
//     const taskValue = taskInput.value;
   
//     if (taskValue !== "") {
//       const taskList = document.getElementById("taskList");
//       const newTask = document.createElement("li");
//       newTask.textContent = taskValue;
   
//       // creamos boton para eliminación de tareas
//       let deleteButton = document.createElement("button");
//       deleteButton.textContent = "X";
//       deleteButton.className = "delete-btn";
   
//       // creamos boton para editar tareas
//       let editButton = document.createElement("button");
//       editButton.textContent = "Editar";
//       editButton.className = "edit-btn";
   
//       // creamos evento para eliminacion de tareas
//       deleteButton.addEventListener("click", function () {
//         taskList.removeChild(newTask);
//       });
   
//       newTask.appendChild(editButton);
//       newTask.appendChild(deleteButton);
//       taskList.appendChild(newTask);
   
//       // crear evento para tachar tarea realizada
//       newTask.addEventListener("click", function (event) {
//         event.stopPropagation(event);
//         newTask.classList.toggle("completed");
//       });
   
//       // crear evento para editar tarea
//       editButton.addEventListener("click", function () {
//         event.stopPropagation();
//         // aquí irá la funcion que vamos a crear abajo, exclusivamente para editar una tarea
//         editTask(newTask);
//       });
   
//       taskInput.value = "";
//     } else {
//       alert("Por favor, ingrese una tarea.");
//     }
//   }
   
//   // EDITAR TAREAS
   
//   function editTask(taskItem) {
//     const currentTask = taskItem.childNodes[0].nodeValue;
   
//     //crear un input para recoger el cambio de la tarea
//     const editInput = document.createElement("input");
//     editInput.type = "text";
//     editInput.value = currentTask;
   
//     // crear un boton para guardar los cambios
//     const saveButton = document.createElement("button");
//     saveButton.textContent = "Guardar";
//     saveButton.className = "save-btn";
   
//     // reemplazar el texto de la tarea por el input y añadimos el boton a su sitio
//     taskItem.innerHTML = "";
//     taskItem.appendChild(editInput);
//     taskItem.appendChild(saveButton);
   
//     // creamos evento para el boton guardar/save-button
//     saveButton.addEventListener("click", function (event) {
//       event.stopPropagation(event);
//       const newText = editInput.value.trim();
   
//       if (newText !== "") {
//         taskItem.textContent = newText;
//         // tenemos que añadir de nuevo los botones editar y borrar
//         //boton borrar
//         let deleteButton = document.createElement("button");
//         deleteButton.textContent = "X";
//         deleteButton.className = "delete-btn";
//         //boton editar
//         let editButton = document.createElement("button");
//         editButton.textContent = "Editar";
//         editButton.className = "edit-btn";
   
//         taskItem.appendChild(editButton);
//         taskItem.appendChild(deleteButton);
   
//         editButton.addEventListener("click", function (event) {
//           event.stopPropagation(event);
//           editTask(taskItem);
//         });
   
//         deleteButton.addEventListener("click", function () {
//           taskItem.parentElement.removeChild(taskItem);
//         });
//       } else {
//         alert("Ingresa una tarea.");
//       }
//     });
//   }
   
//   document.getElementById("addTaskButton").addEventListener("click", addTask);