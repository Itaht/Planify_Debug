import { TaskLabel } from "./taskLabel.js"; // Import TaskLabel module
import { Member } from "./member.js"; // Import Member module

export function Task() {
  // DOM References
  const taskPopupOverlay = document.getElementById("task-popup-overlay");
  const closeTaskPopupButton = document.getElementById("close-task-popup-button");
  const cancelTaskButton = document.getElementById("cancel-task-button");
  const addTaskForm = document.getElementById("add-task-form");
  const taskNameInput = document.getElementById("task-name");
  const taskDetailsInput = document.getElementById("task-details");
  const fileContainer = document.getElementById("file-container");
  const addMemberButton = document.getElementById("add-member-button");
  const startDateButton = document.getElementById("start-date-button");
  const dueDateButton = document.getElementById("due-date-button");
  const setLabelButton = document.getElementById("set-label-button");
  const reminderInput = document.getElementById("reminder");


  const projectMembers = [
    { id: "1", name: "Alice", profilePicture: "https://via.placeholder.com/40" },
    { id: "2", name: "Bob", profilePicture: "https://via.placeholder.com/40" },
    { id: "3", name: "Charlie", profilePicture: "https://via.placeholder.com/40" },
  ];

  // Debug to confirm members are correctly defined
  console.log("Project members:", JSON.stringify(projectMembers, null, 2));

  // Initialize the Member module with project members
  const { showMemberPopup } = Member(projectMembers);
  const { showLabelPopup } = TaskLabel(); // Get the showLabelPopup function from TaskLabel module

  let uploadedFiles = []; // Array to manage uploaded files
  let taskData = {}; // Object to store task details
  document.getElementById("task-popup-content").style.height = "75vh";

  // Show Task Popup
  function showTaskPopup() {
    taskPopupOverlay.classList.remove("hidden");
  }

  // Close Task Popup
  function closeTaskPopup() {
    taskPopupOverlay.classList.add("hidden");
    resetTaskPopupInputs(); // Reset all inputs
  }

  // Reset Task Popup Inputs
  function resetTaskPopupInputs() {
    if (addTaskForm) addTaskForm.reset();

    // Clear file container
    fileContainer.innerHTML = "";

    // Restore "Add File" button
    const addFileButtonElement = document.createElement("button");
    addFileButtonElement.id = "add-file-button";
    addFileButtonElement.type = "button";
    addFileButtonElement.textContent = "+ add file";
    addFileButtonElement.classList.add("file-button-class"); // Optional: add styling class

    fileContainer.appendChild(addFileButtonElement); // Add the "Add File" button

    // Initialize file handler for the new button
    initializeFileHandler(addFileButtonElement);

    // Reset date and label buttons
    startDateButton.textContent = "dd/mm/yy";
    startDateButton.style.backgroundColor = "";
    startDateButton.style.color = "#949AA0";

    dueDateButton.textContent = "dd/mm/yy";
    dueDateButton.style.backgroundColor = "";
    dueDateButton.style.color = "#949AA0";

    setLabelButton.textContent = "set label";
    setLabelButton.style.backgroundColor = "";
    setLabelButton.style.color = "#949AA0";

    addMemberButton.textContent = "+ add member"; // Reset add member button
    addMemberButton.style.backgroundColor = "";
    addMemberButton.style.color = "#949AA0";

    uploadedFiles = [];
    taskData = {};
  }

  // Initialize File Handling Logic
  function initializeFileHandler(button) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";

    // Trigger file dialog on button click
    button.addEventListener("click", () => {
      fileInput.value = ""; // Reset input value
      fileInput.click(); // Open file dialog
    });

    // Handle file selection
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        displayFile(file);
      }
    });

    fileContainer.appendChild(fileInput); // Append the hidden file input
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

    // Add event listener to remove button
    const removeButton = fileDisplay.querySelector(".remove-file-button");
    removeButton.addEventListener("click", () => {
      uploadedFiles = uploadedFiles.filter((f) => f !== file); // Remove file from the array
      fileDisplay.remove(); // Remove the file display element
    });

    fileContainer.appendChild(fileDisplay);
  }

  // Restrict Reminder Input to Numbers Only
  reminderInput.addEventListener("input", () => {
    // Remove non-numeric characters
    reminderInput.value = reminderInput.value.replace(/\D/g, "");

    // Restrict maximum value to 100
    if (parseInt(reminderInput.value) > 100) {
      reminderInput.value = "99";
    }
  });

  // Ensure a valid value on blur (optional for clearing invalid input)
  reminderInput.addEventListener("blur", () => {
    if (!reminderInput.value || parseInt(reminderInput.value) <= 0) {
      reminderInput.value = ""; // Clear invalid input
    }
  });

  // Attach Event Listeners
  closeTaskPopupButton.addEventListener("click", closeTaskPopup);
  cancelTaskButton.addEventListener("click", closeTaskPopup);

  taskPopupOverlay.addEventListener("click", (event) => {
    if (event.target === taskPopupOverlay) {
      closeTaskPopup();
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


  console.log("Task module initialized."); // Debug log

  // Initialize the Task Popup
  resetTaskPopupInputs(); // Ensure initial setup
}
