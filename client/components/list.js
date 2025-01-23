export function List() {
  const listContainer = document.getElementById("list-container");
  const addListButton = document.getElementById("add-list-button");
  const taskPopupOverlay = document.getElementById("task-popup-overlay");
  const taskListIdInput = document.getElementById("task-list-id"); // Hidden input to store target list ID

  let listCount = 0;
  const initialPosition = 27; // Initial position of add-list-button in vw
  const offset = 302; // Offset for positioning lists (in px)

  // Function to update the position of the add-list-button
  function updateAddListButtonPosition() {
    addListButton.style.left = `calc(${initialPosition}vw + ${listCount * offset}px)`;
  }

  // Function to create a new list input box
  function createNewListInputBox() {
    addListButton.style.display = "none";

    const createNewListBox = document.createElement("div");
    createNewListBox.classList.add("create-new-list");

    const listInput = document.createElement("input");
    listInput.type = "text";
    listInput.placeholder = "Enter list name...";
    listInput.classList.add("add-list-input");

    const buttonRow = document.createElement("div");
    buttonRow.classList.add("button-row");

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "cancel";
    cancelButton.classList.add("cancel-list-button");
    cancelButton.addEventListener("click", () => {
      createNewListBox.remove();
      addListButton.style.display = "block";
    });

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
  function renderList(listData, container, existingList = null) {
    const list = document.createElement("div");
    list.classList.add("list");
    list.setAttribute("data-list-id", listData.id);
  
    // Container for title and settings
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("list-title-container");
  
    // List title
    const title = document.createElement("span");
    title.classList.add("list-title");
    title.textContent = listData.title;
  
    // Settings icon
    const listSettingsIcon = document.createElement("img");
    listSettingsIcon.src = "../assets/setting.svg"; // Replace with the actual path to your settings.svg
    listSettingsIcon.alt = "Settings";
    listSettingsIcon.classList.add("list-settings-icon");
  
    // List settings popup
    const settingsPopup = document.createElement("div");
    settingsPopup.classList.add("list-settings-popup", "hidden");
  
    // Rename List button
    const renameButton = document.createElement("p");
    renameButton.textContent = "rename list";
    renameButton.addEventListener("click", () => {
      console.log("Rename list clicked.");
  
      // Replace list content with the rename input box
      list.innerHTML = ""; // Clear the current list content
  
      const renameContainer = document.createElement("div");
      renameContainer.classList.add("rename-list");
  
      const renameInput = document.createElement("input");
      renameInput.type = "text";
      renameInput.value = listData.title; // Pre-fill with the current title
      renameInput.classList.add("add-list-input");
      renameInput.placeholder = "Enter new name...";
  
      const buttonRow = document.createElement("div");
      buttonRow.classList.add("button-row");
  
      const cancelRenameButton = document.createElement("button");
      cancelRenameButton.textContent = "cancel";
      cancelRenameButton.classList.add("cancel-rename-button");
      cancelRenameButton.addEventListener("click", () => {
        console.log("Rename canceled.");
        renderList(listData, container, list); // Re-render the original list in place
      });
      
      const confirmRenameButton = document.createElement("button");
      confirmRenameButton.textContent = "confirm";
      confirmRenameButton.classList.add("confirm-rename-button");
      confirmRenameButton.addEventListener("click", () => {
        const newTitle = renameInput.value.trim();
        if (newTitle) {
          console.log("List renamed to:", newTitle);
          listData.title = newTitle; // Update the list title in the data
          renderList(listData, container, list); // Re-render the updated list in place
        } else {
          alert("List name cannot be empty.");
        }
      });
  
      buttonRow.appendChild(cancelRenameButton);
      buttonRow.appendChild(confirmRenameButton);
      renameContainer.appendChild(renameInput);
      renameContainer.appendChild(buttonRow);
      list.appendChild(renameContainer);
      renameInput.focus();
    });
  
    // Add Task button
    const addTaskButton = document.createElement("p");
    addTaskButton.textContent = "add a task";
    addTaskButton.addEventListener("click", () => {
      console.log("Add task clicked.");
      taskPopupOverlay.classList.remove("hidden");
      settingsPopup.classList.add("hidden");
    });
  
    // Delete List button
    const deleteButton = document.createElement("p");
    deleteButton.textContent = "delete list";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      console.log("Delete list clicked.");
      list.remove();
      listCount--;
      updateAddListButtonPosition();
    });
  
    settingsPopup.appendChild(renameButton);
    settingsPopup.appendChild(addTaskButton);
    settingsPopup.appendChild(deleteButton);
  
    // Add event listener to settings icon
    listSettingsIcon.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click propagation
      const isHidden = settingsPopup.classList.contains("hidden");
      document.querySelectorAll(".list-settings-popup").forEach((popup) =>
        popup.classList.add("hidden")
      );
  
      if (isHidden) {
        const rect = listSettingsIcon.getBoundingClientRect();
        settingsPopup.style.top = `${rect.top + window.scrollY}px`; // Adjust for upward offset
        settingsPopup.style.left = `${rect.left + window.scrollX + 55}px`; // Adjust for rightward offset
        settingsPopup.classList.remove("hidden");
      }
    });
  
    document.addEventListener("click", () => {
      settingsPopup.classList.add("hidden");
    });
  
    titleContainer.appendChild(title);
    titleContainer.appendChild(listSettingsIcon);
    list.appendChild(titleContainer);
  
    // Add Task button inside the list
    const addTaskButtonInList = document.createElement("button");
    addTaskButtonInList.textContent = "+ add a task";
    addTaskButtonInList.classList.add("add-task-button");
    addTaskButtonInList.addEventListener("click", () => {
      console.log("Add task clicked (from list).");
      taskPopupOverlay.classList.remove("hidden");
    });
  
    list.appendChild(addTaskButtonInList);
  
    // Replace the existing list if provided
    if (existingList) {
      container.replaceChild(list, existingList);
    } else {
      container.appendChild(list);
    }
  
    // Append the settings popup to the body for absolute positioning
    document.body.appendChild(settingsPopup);
  }  
  

  addListButton.addEventListener("click", createNewListInputBox);
  updateAddListButtonPosition();
}
