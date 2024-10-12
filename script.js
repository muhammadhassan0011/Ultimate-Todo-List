"use strict";

//  variable of Array ~ Objects :
let categories = [
  {
    title: "Personal",
    img: "boy.png",
  },
  {
    title: "Work",
    img: "briefcase.png",
  },
  {
    title: "Shopping",
    img: "shopping.png",
  },
  {
    title: "Coding",
    img: "web-design.png",
  },
  {
    title: "Health",
    img: "healthcare.png",
  },
  {
    title: "Fitness",
    img: "dumbbell.png",
  },
  {
    title: "Education",
    img: "education.png",
  },
  {
    title: "Finance",
    img: "saving.png",
  },
];

let tasks = [
  {
    id: 1,
    task: "Go to market",
    category: "Shopping",
    completed: false,
  },
  {
    id: 2,
    task: "Read a chapter of a book",
    category: "Personal",
    completed: false,
  },
  {
    id: 3,
    task: "Prepare presentation for meeting",
    category: "Work",
    completed: false,
  },
  {
    id: 4,
    task: "Complete coding challenge",
    category: "Coding",
    completed: false,
  },
  {
    id: 5,
    task: "Take a 30-minute walk",
    category: "Health",
    completed: false,
  },
  {
    id: 6,
    task: "Do a 20-minute JIM workout",
    category: "Fitness",
    completed: false,
  },
  {
    id: 7,
    task: "Watch an educational video online",
    category: "Education",
    completed: false,
  },
  {
    id: 8,
    task: "Review monthly budget",
    category: "Finance",
    completed: false,
  },
  {
    id: 9,
    task: "Buy groceries for the week",
    category: "Shopping",
    completed: false,
  },
  {
    id: 10,
    task: "Write in a journal",
    category: "Personal",
    completed: false,
  },
  {
    id: 11,
    task: "Send follow-up emails",
    category: "Work",
    completed: false,
  },
  {
    id: 12,
    task: "Work on a coding side project",
    category: "Coding",
    completed: false,
  },
  {
    id: 13,
    task: "Try a new healthy recipe",
    category: "Health",
    completed: false,
  },
  {
    id: 14,
    task: "Attend a yoga class",
    category: "Fitness",
    completed: false,
  },
  {
    id: 15,
    task: "Read an article about a new topic",
    category: "Education",
    completed: false,
  },
  {
    id: 16,
    task: "Set up automatic bill payments",
    category: "Finance",
    completed: false,
  },
  // Additional tasks for each category
  {
    id: 17,
    task: "Buy new clothes",
    category: "Shopping",
    completed: false,
  },
  {
    id: 18,
    task: "Meditate for 10 minutes",
    category: "Personal",
    completed: false,
  },
  {
    id: 19,
    task: "Prepare agenda for team meeting",
    category: "Work",
    completed: false,
  },
  {
    id: 20,
    task: "Debug a software issue",
    category: "Coding",
    completed: false,
  },
  {
    id: 21,
    task: "Try a new recipe for lunch",
    category: "Health",
    completed: false,
  },
  {
    id: 22,
    task: "Go for a run",
    category: "Fitness",
    completed: false,
  },
  {
    id: 23,
    task: "Learn a new language online",
    category: "Education",
    completed: false,
  },
  {
    id: 24,
    task: "Read about history",
    category: "Education",
    completed: false,
  },
  {
    id: 25,
    task: "Review investment portfolio",
    category: "Finance",
    completed: false,
  },
];

console.log(tasks);

// Variables
let selectedCategories = categories[0];
const todoList = document.querySelector(".todoList");
const screenBackdrop = document.querySelector(".screen-backdrop");
const backBtn = document.querySelector(".back-btn");
const taskContainer = document.querySelector(".tasks");
const totalTasks = document.querySelector(".total-tasks");
const numTasks = document.querySelector("#num-tasks");
const categoriesContainer = document.querySelector(".categories");
const categorySelect = document.querySelector("#category-select");
const categoryImg = document.querySelector("#category-img");
const categoryTitle = document.querySelector("#category-title");
const addTaskBtn = document.querySelector(".add-task-btn");
const menuBtn = document.querySelector(".menu-btn");
const blackBackdrop = document.querySelector(".black-backdrop");
const addTaskWrapper = document.querySelector(".add-task");
const taskInput = document.querySelector("#task-input");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");
const heading = document.querySelector(".heading");

// Variables for Edit Task :
let blackBackdropEdit = document.querySelector(".black-backdrop-edit");
let editTaskWrapper = document.querySelector(".edit-task");
let editTaskInput = document.querySelector("#edit-task-input");
let editCategorySelect = document.querySelector("#edit-category-select");
let editConfirmBtn = document.querySelector(".edit-confirm-btn");
let editCancelBtn = document.querySelector(".edit-cancel-btn");
let currentEditTaskId = null;

//// Toast Display : functionality : >
const showToast = (operation) => {
  const toast = document.createElement("div");
  toast.classList.add("toast");

  if (operation === "add") {
    toast.innerHTML = `Your Task has been added`;
    toast.style.backgroundColor = "green";
  } else if (operation === "delete") {
    toast.innerHTML = `Task has been deleted`;
    toast.style.backgroundColor = "red";
  } else if (operation === "edit") {
    toast.innerHTML = `Task has been Updated`;
    toast.style.backgroundColor = "blue";
  }

  taskContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
};

const toggleActive = () => {
  addTaskBtn.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskWrapper.classList.toggle("active");

  // taskInput.value = "";
  heading.textContent = "Add Task";
  // taskInput.focus();
};

const toggleScreen = () => {
  todoList.classList.toggle("show-category");
};

const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocal = () => {
  const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
  if (tasksLocal) {
    tasks = tasksLocal;
  }
};

const updateTotal = () => {
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategories.title.toLowerCase()
  );
  // console.log(categoryTasks);
  numTasks.innerHTML = `${categoryTasks.length} tasks`;
  totalTasks.innerHTML = `${tasks.length} tasks`;
};

const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryTasks = tasks.filter(
      (task) => task.category.toLowerCase() === category.title.toLowerCase()
    );
    // console.log(categoryTasks);
    const div = document.createElement("div");
    div.classList.add("category");

    div.addEventListener("click", () => {
      todoList.classList.add("show-category");
      selectedCategories = category;
      updateTotal();

      // render tasks when category changes :
      categoryImg.src = `images/${category.img}`;
      categoryTitle.innerHTML = category.title;
      renderTasks();
    });

    div.innerHTML = `
    <div class="category-box">
    <div class="category-content">
                  <div class="category-img">
                    <img src="images/${category.img}" alt="" />
                  </div>

                  <div class="category-txt">
                    <h2>${category.title}</h2>
                    <p class="category-tasks">${
                      categoryTasks.length !== 0
                        ? categoryTasks.length + " Tasks"
                        : "No tasks added Yet"
                    } </p>
                  </div>
                  </div>

                <div class="options">
                  <div class="toggle-btn">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                      >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </div>
                </div>
                </div>`;

    categoriesContainer.appendChild(div);
  });
};

const renderTasks = () => {
  taskContainer.innerHTML = "";
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategories.title.toLowerCase()
  );

  if (categoryTasks.length === 0) {
    taskContainer.innerHTML =
      '<p class="no-tasks">No tasks added for this category</p>';
  } else {
    categoryTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const label = document.createElement("label");
      label.classList.add("task");
      const checkmark = document.createElement("input");
      checkmark.type = "checkbox";
      checkmark.id = task.id;
      checkmark.checked = task.completed;

      checkmark.addEventListener("change", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        saveLocal();
      });

      label.setAttribute("for", checkmark.id);
      checkmark.setAttribute("id", task.id);

      label.innerHTML = `
       <span class="checkmark">
       <svg
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
                      stroke-width="3"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
         </span>
           <p>${task.task}</p>
        `;

      div.innerHTML = `
       <div class="edit-del">
                <div class="edit">
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </div>
                <div class="delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            `;
      div.prepend(label);
      label.prepend(checkmark);
      taskContainer.append(div);

      // Edit Button Functionality
      // div.querySelector(".edit").addEventListener("click", () => {
      //   currentTask = task;
      //   toggleActive(true);
      //   taskInput.value = task.task;
      //   heading.textContent = "Edit Task";
      // });

      // Delete Button Functionality
      div.querySelector(".delete").addEventListener("click", () => {
        tasks = tasks.filter((t) => t.id !== task.id);
        saveLocal();
        renderTasks();
        updateTotal();
        renderCategories();
        showToast("delete");
      });
    });
  }
};

// const addTask = () => {
//   if (taskInput.value === "") {
//     alert("Plz Add Task First! (Task box is Empty)");
//   } else {
//     const newTask = {
//       id: Date.now(),
//       task: taskInput.value,
//       category: selectedCategories.title,
//       completed: false,
//     };
//     taskInput.value = "";
//     tasks.push(newTask);
//     saveLocal();
//     toggleActive();
//     renderTasks();
//     updateTotal();
//     renderCategories();
//     showToast("add");
//   }
// };

const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const category = categorySelect.value;

  if (task === "") {
    alert("Plz Add Task First! (Task box is Empty)");
  } else {
    const newTask = {
      id: Date.now(),
      task,
      category,
      completed: false,
    };
    taskInput.value = "";
    tasks.push(newTask);
    saveLocal();
    toggleActive();
    renderTasks();
    updateTotal();
    renderCategories();
    showToast("add");
  }
};

// Event Listeners
addTaskBtn.addEventListener("click", toggleActive);
cancelBtn.addEventListener("click", toggleActive);
blackBackdrop.addEventListener("click", toggleActive);
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);
addBtn.addEventListener("click", addTask);

//  render Initial Stage :
getLocal();
renderTasks();
renderCategories();
updateTotal();

categories.forEach((category) => {
  const options = document.createElement("option");
  options.value = category.title.toLowerCase();
  options.textContent = category.title;

  categorySelect.appendChild(options);
});

//

//  EDIT BTN FUNCTIONALITY CHATGPT :

// Function to toggle Edit Task Modal
const toggleEditModal = () => {
  editTaskWrapper.classList.toggle("active");
  blackBackdropEdit.classList.toggle("active");
  // editTaskInput.focus();
};

// Function to open edit modal with task data
const openEditTaskModal = (taskId) => {
  const taskToEdit = tasks.find((task) => task.id === parseInt(taskId));
  currentEditTaskId = taskToEdit.id;
  editTaskInput.value = taskToEdit.task;

  populateEditCategories();
  editCategorySelect.value = taskToEdit.category; // Populate categories and pre-select the current task's category
  toggleEditModal();
};

// Add event listeners to Edit buttons
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    const taskId = e.target.closest(".task-wrapper").querySelector("input").id;
    console.log(taskId);
    openEditTaskModal(taskId);
  }
});

// Confirm button to save edits
editConfirmBtn.addEventListener("click", () => {
  const updatedTask = editTaskInput.value;
  const updatedCategory = editCategorySelect.value;

  if (updatedTask.trim() !== "") {
    const taskIndex = tasks.findIndex((task) => task.id === currentEditTaskId);
    tasks[taskIndex].task = updatedTask;
    tasks[taskIndex].category = updatedCategory;
    saveLocal();
    renderTasks();
    renderCategories();
    toggleEditModal();
    showToast("edit");
  }
  console.log(updatedCategory);
});

// Cancel button to close edit modal
editCancelBtn.addEventListener("click", toggleEditModal);
blackBackdropEdit.addEventListener("click", toggleEditModal);

// Populate categories in the edit select box
const populateEditCategories = () => {
  editCategorySelect.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title;
    option.textContent = category.title;
    editCategorySelect.appendChild(option);
  });
};

// Ensure categories are loaded on page load
populateEditCategories();
/////////////////////////////////////////////////////////////////////
