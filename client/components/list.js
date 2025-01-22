export function List() {
    const listContainer = document.getElementById("list-container");
    const addListButton = document.getElementById("add-list-button");
    const taskPopupOverlay = document.getElementById("task-popup-overlay");
  
    let listCount = 0;
    const initialPosition = 27; // Initial position of add-list-button in vw
    const offset = 302; // Offset for positioning lists (in px)
  
    // Function to update the position of the add-list-button
    function updateAddListButtonPosition() {
      addListButton.style.left = `calc(${initialPosition}vw + ${listCount * offset}px)`;
    }
  
    // Function to create a new list input box
    function createNewListInputBox() {
      // Hide the add-list-button
      addListButton.style.display = "none";
  
      // Create input box container
      const createNewListBox = document.createElement("div");
      createNewListBox.classList.add("create-new-list");
  
      // Create input field for list name
      const listInput = document.createElement("input");
      listInput.type = "text";
      listInput.placeholder = "Enter list name...";
      listInput.classList.add("add-list-input");
  
      // Button container for cancel and confirm buttons
      const buttonRow = document.createElement("div");
      buttonRow.classList.add("button-row");
  
      // Cancel button
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "cancel";
      cancelButton.classList.add("cancel-list-button");
      cancelButton.addEventListener("click", () => {
        createNewListBox.remove();
        addListButton.style.display = "block"; // Show the add-list-button again
      });
  
      // Confirm button
      const confirmButton = document.createElement("button");
      confirmButton.textContent = "confirm";
      confirmButton.classList.add("confirm-list-button");
      confirmButton.addEventListener("click", () => {
        const listName = listInput.value.trim();
        if (listName) {
          const listData = { id: Date.now(), title: listName };
          renderList(listData, listContainer);
          listCount++;
          updateAddListButtonPosition();
          createNewListBox.remove();
          addListButton.style.display = "block";
        } else {
          alert("List name cannot be empty.");
        }
      });
  
      buttonRow.appendChild(cancelButton);
      buttonRow.appendChild(confirmButton);
      createNewListBox.appendChild(listInput);
      createNewListBox.appendChild(buttonRow);
      listContainer.appendChild(createNewListBox);
    }
  
    // Function to render a list
    function renderList(listData, container) {
      const list = document.createElement("div");
      list.classList.add("list");
      list.setAttribute("data-list-id", listData.id);
  
      // List title
      const title = document.createElement("span");
      title.classList.add("list-title");
      title.textContent = listData.title;
      list.appendChild(title);
  
      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete List";
      deleteButton.classList.add("delete-list-button");
      deleteButton.addEventListener("click", () => {
        list.remove();
        listCount--;
        updateAddListButtonPosition();
      });
      list.appendChild(deleteButton);
  
      // Add Task button
      const addTaskButton = document.createElement("button");
      addTaskButton.textContent = "+ add a task";
      addTaskButton.classList.add("add-task-button");
      addTaskButton.addEventListener("click", () => {
        taskPopupOverlay.classList.remove("hidden"); // Show the task popup
      });
      list.appendChild(addTaskButton);
  
      container.appendChild(list);
    }
  
    // Add event listener to the add-list-button
    addListButton.addEventListener("click", createNewListInputBox);
  
    // Ensure add-list-button starts at the correct position
    updateAddListButtonPosition();
  }
  