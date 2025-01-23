import { TaskLabel } from "./taskLabel.js";
import { Member } from "./member.js";
import { ConfirmationPopup } from "./confirmationPopup.js";

export function Task() {
  // DOM References
  const taskPopupOverlay = document.getElementById("task-popup-overlay");
  const closeTaskPopupButton = document.getElementById("close-task-popup-button");
  const cancelTaskButton = document.getElementById("cancel-task-button");
  const addTaskForm = document.getElementById("add-task-form");
  const fileContainer = document.getElementById("file-container");
  const addMemberButton = document.getElementById("add-member-button");
  const startDateButton = document.getElementById("start-date-button");
  const dueDateButton = document.getElementById("due-date-button");
  const setLabelButton = document.getElementById("set-label-button");
  const reminderInput = document.getElementById("reminder");

  const { showConfirmationPopup, hideConfirmationPopup } = ConfirmationPopup();

  const projectMembers = [
    { id: "1", name: "Alice", profilePicture: "https://via.placeholder.com/40" },
    { id: "2", name: "Bob", profilePicture: "https://via.placeholder.com/40" },
    { id: "3", name: "Charlie", profilePicture: "https://via.placeholder.com/40" },
  ];

  const { showMemberPopup } = Member(projectMembers);
  const { showLabelPopup } = TaskLabel();

  let uploadedFiles = [];
  let taskData = {};
  document.getElementById("task-popup-content").style.height = "75vh";

  // Show Task Popup
  function showTaskPopup() {
    taskPopupOverlay.classList.remove("hidden");
  }

  // Close Task Popup with Confirmation
  function closeTaskPopupWithConfirmation() {
    showConfirmationPopup();

    // Attach event listener to confirm button in confirmation popup
    const discardButton = document.querySelector("#discard-button");
    discardButton.addEventListener("click", () => {
      closeTaskPopup(); // Close the popup and reset the inputs
      hideConfirmationPopup(); // Hide the confirmation popup
    });

    // Cancel button simply hides the confirmation popup
    const cancelDiscardButton = document.querySelector("#cancel-discard-button");
    cancelDiscardButton.addEventListener("click", () => {
      hideConfirmationPopup();
    });
  }

  // Close Task Popup (without confirmation, for confirmed discard)
  function closeTaskPopup() {
    taskPopupOverlay.classList.add("hidden");
    resetTaskPopupInputs(); // Reset all inputs
  }

  // Reset Task Popup Inputs
  function resetTaskPopupInputs() {
    if (addTaskForm) addTaskForm.reset();

    fileContainer.innerHTML = "";

    const addFileButtonElement = document.createElement("button");
    addFileButtonElement.id = "add-file-button";
    addFileButtonElement.type = "button";
    addFileButtonElement.textContent = "+ add file";
    addFileButtonElement.classList.add("file-button-class");

    fileContainer.appendChild(addFileButtonElement);
    initializeFileHandler(addFileButtonElement);

    startDateButton.textContent = "dd/mm/yy";
    startDateButton.style.backgroundColor = "";
    startDateButton.style.color = "#949AA0";

    dueDateButton.textContent = "dd/mm/yy";
    dueDateButton.style.backgroundColor = "";
    dueDateButton.style.color = "#949AA0";

    addMemberButton.textContent = "+ add member";
    addMemberButton.style.backgroundColor = "";
    addMemberButton.style.color = "#949AA0";

    // Reset startDate and dueDate
    startDate = null;
    dueDate = null;

    uploadedFiles = [];
    taskData = {};
  }


  // Initialize File Handling Logic
  function initializeFileHandler(button) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";

    button.addEventListener("click", () => {
      fileInput.value = "";
      fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        displayFile(file);
      }
    });

    fileContainer.appendChild(fileInput);
  }

  // Display Selected File
  function displayFile(file) {
    uploadedFiles.push(file);

    const fileDisplay = document.createElement("div");
    fileDisplay.classList.add("file-display");
    fileDisplay.innerHTML = `
      <span class="file-name">${file.name}</span>
      <button class="remove-file-button">X</button>
    `;

    const removeButton = fileDisplay.querySelector(".remove-file-button");
    removeButton.addEventListener("click", () => {
      uploadedFiles = uploadedFiles.filter((f) => f !== file);
      fileDisplay.remove();
    });

    fileContainer.appendChild(fileDisplay);
  }

  // Restrict Reminder Input to Numbers Only
  reminderInput.addEventListener("input", () => {
    reminderInput.value = reminderInput.value.replace(/\D/g, "");
    if (parseInt(reminderInput.value) > 100) {
      reminderInput.value = "99";
    }
  });

  reminderInput.addEventListener("blur", () => {
    if (!reminderInput.value || parseInt(reminderInput.value) <= 0) {
      reminderInput.value = "";
    }
  });

  // Attach Event Listeners
  closeTaskPopupButton.addEventListener("click", closeTaskPopupWithConfirmation);
  cancelTaskButton.addEventListener("click", closeTaskPopupWithConfirmation);

  taskPopupOverlay.addEventListener("click", (event) => {
    if (event.target === taskPopupOverlay) {
      closeTaskPopupWithConfirmation();
    }
  });

  // Show Label Popup when setLabelButton is clicked
  setLabelButton.addEventListener("click", () => {
    showLabelPopup();
  });

  // Show Member Popup when addMemberButton is clicked
  addMemberButton.addEventListener("click", () => {
    console.log("Add member button clicked.");
    showMemberPopup();
  });

  console.log("Task module initialized.");
  resetTaskPopupInputs();
}
