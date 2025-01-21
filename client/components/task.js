export function Task() {
    const addTaskForm = document.querySelector('#add-task-form');
    const taskNameInput = document.querySelector('#task-name');
    const taskDetailsInput = document.querySelector('#task-details');
    const addFileButton = document.querySelector('#add-file-button');
    const startDateButton = document.querySelector('#start-date-button');
    const dueDateButton = document.querySelector('#due-date-button');
    const setLabelButton = document.querySelector('#set-label-button');
    const addMemberButton = document.querySelector('#add-member-button');
    const reminderInput = document.querySelector('#reminder');
    const taskPopupOverlay = document.querySelector('#task-popup-overlay');
    const closeTaskPopupButton = document.querySelector('#close-task-popup-button');
    const fileContainer = document.querySelector('#file-container'); // Container to display selected files
  
    let taskData = {}; // Object to hold task data
    let uploadedFiles = []; // Array to hold files
  
    // Handle task form submission
    addTaskForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const taskName = taskNameInput.value;
      const taskDetails = taskDetailsInput.value;
      const reminder = reminderInput.value;
  
      if (taskName && taskDetails) {
        taskData = {
          taskName,
          taskDetails,
          reminder,
          startDate: taskData.startDate || null,
          dueDate: taskData.dueDate || null,
          label: taskData.label || null,
          members: taskData.members || [],
          files: uploadedFiles // Include files in the task data
        };
  
        // Save the task (to localStorage or backend)
        saveTask(taskData);
  
        // Close the popup after adding the task
        hideTaskPopup();
  
        // Optionally reset the form inputs
        addTaskForm.reset();
        fileContainer.innerHTML = ''; // Clear the file container after task creation
      } else {
        alert('Please enter both task name and details.');
      }
    });
  
    // Real function to save a task (e.g., to localStorage or backend)
    function saveTask(taskData) {
      // Simulate saving task in localStorage or sending to backend
      localStorage.setItem('task', JSON.stringify(taskData)); // Example: saving to localStorage
      alert(`Task "${taskData.taskName}" saved!`);
    }
  
    // Event listener for adding a file
    addFileButton.addEventListener('click', function () {
      // Trigger file input for file selection
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.multiple = true; // Allow multiple files to be selected
      fileInput.click();
  
      fileInput.addEventListener('change', function () {
        const files = fileInput.files;
        if (files.length > 0) {
          // Display selected files
          displayFiles(files);
        }
      });
    });
  
    // Function to display selected files
    function displayFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
  
        // Add file to uploadedFiles array
        uploadedFiles.push(file);
  
        // Create a new file element to display
        const fileElement = document.createElement('div');
        fileElement.classList.add('file-item');
        fileElement.innerHTML = `
          <span>${file.name}</span>
          <button class="remove-file-button">Remove</button>
        `;
  
        // Add remove file functionality
        const removeButton = fileElement.querySelector('.remove-file-button');
        removeButton.addEventListener('click', function () {
          removeFile(file);
          fileElement.remove();
        });
  
        // Append file element to file container
        fileContainer.appendChild(fileElement);
      }
    }
  
    // Function to remove a file from the uploadedFiles array
    function removeFile(fileToRemove) {
      uploadedFiles = uploadedFiles.filter(file => file !== fileToRemove);
    }
  
    // Event listener for selecting start date
    startDateButton.addEventListener('click', function () {
      const startDate = prompt("Enter Start Date (YYYY-MM-DD):");
      if (startDate) {
        taskData.startDate = startDate;
        alert(`Start date set to: ${startDate}`);
      }
    });
  
    // Event listener for selecting due date
    dueDateButton.addEventListener('click', function () {
      const dueDate = prompt("Enter Due Date (YYYY-MM-DD):");
      if (dueDate) {
        taskData.dueDate = dueDate;
        alert(`Due date set to: ${dueDate}`);
      }
    });
  
    // Event listener for setting a label
    setLabelButton.addEventListener('click', function () {
      const label = prompt("Enter Label for the task:");
      if (label) {
        taskData.label = label;
        alert(`Label set to: ${label}`);
      }
    });
  
    // Event listener for adding a member to the task
    addMemberButton.addEventListener('click', function () {
      const member = prompt("Enter member name to add:");
      if (member) {
        taskData.members.push(member);
        alert(`${member} added to task.`);
      }
    });
  
    // Event listener for reminder input change
    reminderInput.addEventListener('change', function () {
      const reminderValue = reminderInput.value;
      taskData.reminder = reminderValue;
      alert(`Reminder set to: ${reminderValue}`);
    });
  
    // Show the task popup
    function showTaskPopup() {
      taskPopupOverlay.classList.remove('hidden');
    }
  
    // Hide the task popup
    function hideTaskPopup() {
      taskPopupOverlay.classList.add('hidden');
    }
  
    // Event listener to close the popup when the close button is clicked
    closeTaskPopupButton.addEventListener('click', function () {
      hideTaskPopup();
      addTaskForm.reset(); // Reset the form fields when closing the popup
      fileContainer.innerHTML = ''; // Clear the file container
    });
  
    // Optionally, you can add event listeners to show the popup in the UI
    // For example, you can trigger `showTaskPopup()` when a "Create Task" button is clicked
  }
  