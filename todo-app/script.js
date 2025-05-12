const input = document.getElementById("txt");
const btn = document.getElementById("btn");
const taskContainer = document.getElementById("task");

const toast = document.getElementById("toast");
const modal = document.getElementById("modal");
const modalInput = document.getElementById("modal-input");
const modalSave = document.getElementById("modal-save");
const modalCancel = document.getElementById("modal-cancel");

let currentTaskSpan = null;

function showToast(message) {
  toast.textContent = message;
  toast.style.opacity = 1;
  toast.style.bottom = "50px";
  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.bottom = "30px";
  }, 3000);
}

function openModal(currentText, spanElement) {
  modal.classList.remove("hidden");
  modalInput.value = currentText;
  modalInput.focus();
  currentTaskSpan = spanElement;
}

function closeModal() {
  modal.classList.add("hidden");
  modalInput.value = "";
  currentTaskSpan = null;
}

btn.addEventListener("click", () => {
  const taskText = input.value.trim();

  if (taskText !== "") {
    const task = document.createElement("div");

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "10px";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    editBtn.addEventListener("click", () => {
      openModal(taskContent.textContent, taskContent);
    });

    deleteBtn.addEventListener("click", () => {
      task.remove();
    });

    task.appendChild(taskContent);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);

    taskContainer.appendChild(task);
    input.value = "";
  } else {
    showToast("Please enter a task.");
  }
});

modalSave.addEventListener("click", () => {
  const newText = modalInput.value.trim();
  if (newText && currentTaskSpan) {
    currentTaskSpan.textContent = newText;
    closeModal();
  } else {
    showToast("Task cannot be empty.");
  }
});

modalCancel.addEventListener("click", closeModal);
