import { ConfirmationPopup } from './confirmationPopup.js';

export function Board() {
    // DOM References
    const createBoardButton = document.getElementById("create-board-button");
    const popupOverlay = document.getElementById("popup-overlay");
    const closePopupButton = document.getElementById("close-popup-button");
    const cancelButton = document.getElementById("cancel-button");
    const createBoardForm = document.getElementById("create-board-form");
    const createBoardButtonForm = document.getElementById("create-board-button-form");
    const boardListContainer = document.getElementById("board-list-container");
    const boardTopic = document.getElementById("board-topic");
    const boardDescription = document.getElementById("board-topic-description");
    const { showConfirmationPopup, hideConfirmationPopup } = ConfirmationPopup();

    // Function to reset and hide the popup overlay
    function resetPopupOverlay() {
        popupOverlay.classList.add("hidden");
        createBoardForm.reset(); // Reset all input fields in the form
    }

    // Function to handle the confirmation logic
    function handleConfirmation(action) {
        if (action === "discard") {
            resetPopupOverlay(); // Close and reset the overlay
        }
        hideConfirmationPopup();
    }

    // Attach event listeners to confirmation popup buttons
    document.getElementById("cancel-discard-button").addEventListener("click", () => {
        hideConfirmationPopup();
    });

    document.getElementById("discard-button").addEventListener("click", () => {
        handleConfirmation("discard");
    });

    // Function to update the board topic and description
    function updateBoardDetails(name, description) {
        boardTopic.textContent = name || "Untitled Board"; // Fallback for empty name
        boardDescription.textContent = description || "No description provided."; // Fallback for empty description
    }

    // Function to create a new board
    function createBoard(event) {
        event.preventDefault(); // Prevent form submission reload

        // Get inputs
        const boardNameInput = document.getElementById("board-name");
        const boardDescriptionInput = document.getElementById("input-board-description");
        const boardName = boardNameInput.value.trim();
        const boardDescription = boardDescriptionInput.value.trim();

        // Validate board name
        if (boardName) {
            // Create a new board button
            const newBoardButton = document.createElement("button");
            newBoardButton.className = "board-button";
            newBoardButton.textContent = boardName;

            // Store board description as a data attribute (hidden)
            newBoardButton.dataset.description = boardDescription;

            // Add click event to toggle active class and update board details
            newBoardButton.addEventListener("click", () => {
                // Remove active class from all buttons
                document.querySelectorAll(".board-button").forEach((btn) => btn.classList.remove("active"));

                // Add active class to the clicked button
                newBoardButton.classList.add("active");

                // Update the board-topic and board-topic-description
                updateBoardDetails(boardName, boardDescription);
            });

            // Append the new board button to the board list container
            boardListContainer.appendChild(newBoardButton);

            // Reset and close the popup
            resetPopupOverlay();
        } else {
            alert("Please enter a board name.");
        }
    }

    // Attach event listener to form submission
    createBoardForm.addEventListener("submit", createBoard);

    // Explicitly handle clicks on the "Create Board" button
    createBoardButtonForm.addEventListener("click", createBoard);

    // Show popup when the create board button is clicked
    createBoardButton.addEventListener("click", () => {
        popupOverlay.classList.remove("hidden");
    });

    // Show confirmation popup on close button click
    closePopupButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent page reload
        showConfirmationPopup();
    });

    // Show confirmation popup on cancel button click
    cancelButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent page reload
        showConfirmationPopup();
    });

    // Close popup overlay when clicking outside the popup content
    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            showConfirmationPopup();
        }
    });
}
