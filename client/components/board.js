export function Board() {
    // Get references to the board list container and create board form
    const createBoardButton = document.getElementById("create-board-button");
    const popupOverlay = document.getElementById("popup-overlay");
    const closePopupButton = document.getElementById("close-popup-button");
    const cancelButton = document.getElementById("cancel-button");
    const createBoardForm = document.getElementById("create-board-form");
    const boardListContainer = document.getElementById("board-list-container");
  
    // Function to create a new board
    function createBoard(event) {
      event.preventDefault(); // Prevent form submission
  
      const boardNameInput = document.getElementById("board-name");
      const boardName = boardNameInput.value.trim();
  
      if (boardName) {
        // Create a new board button
        const newBoardButton = document.createElement("button");
        newBoardButton.className = "board-button";
        newBoardButton.textContent = boardName;
  
        // Add click event to toggle active class
        newBoardButton.addEventListener("click", () => {
          // Remove active class from all buttons
          document
            .querySelectorAll(".board-button")
            .forEach((btn) => btn.classList.remove("active"));
  
          // Add active class to the clicked button
          newBoardButton.classList.add("active");
        });
  
        // Append the new board button to the board list container
        boardListContainer.appendChild(newBoardButton);
  
        // Clear input and hide popup
        boardNameInput.value = "";
        popupOverlay.classList.add("hidden");
      } else {
        alert("Please enter a board name.");
      }
    }
  
    // Attach event listener to handle form submission
    createBoardForm.addEventListener("submit", createBoard);
  
    // Show the board popup when the "create-board-button" is clicked
    createBoardButton.addEventListener("click", () => {
      popupOverlay.classList.remove("hidden");
    });
  
    // Close the popup when the close button is clicked
    closePopupButton.addEventListener("click", () => {
      popupOverlay.classList.add("hidden");
      createBoardForm.reset(); // Reset the form fields
    });
  
    // Close the popup when the cancel button is clicked
    cancelButton.addEventListener("click", () => {
      popupOverlay.classList.add("hidden");
      createBoardForm.reset(); // Reset the form fields
    });
  
    // Close the popup if clicked outside the popup area
    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.classList.add("hidden");
        createBoardForm.reset();
      }
    });
  }