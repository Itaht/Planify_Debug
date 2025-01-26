// Board.jsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '/styles/board.css'; 
import ConfirmationPopup from './ConfirmationPopup'; 

export function Board() {
  // State management
  const [boards, setBoards] = useState([]); // State to store boards
  const [popupVisible, setPopupVisible] = useState(false); // State to control popup visibility
  const [confirmationVisible, setConfirmationVisible] = useState(false); // State for confirmation popup
  const [newBoard, setNewBoard] = useState({ name: '', description: '' }); // State for new board input
  const [activeBoard, setActiveBoard] = useState(null); // State to store the currently selected active board

  // Function to reset and hide the popup overlay
  const resetPopupOverlay = () => {
    setPopupVisible(false);
    setNewBoard({ name: '', description: '' }); // Reset the input fields
  };

  // Function to create a new board
  const createBoard = (event) => {
    event.preventDefault(); 
    const boardName = newBoard.name.trim();
    const boardDescription = newBoard.description.trim();

    if (boardName) {
      const newBoardData = {
        id: uuidv4(),
        name: boardName,
        description: boardDescription,
      };

      setBoards((prevBoards) => [...prevBoards, newBoardData]);
      resetPopupOverlay(); // Close the popup and reset inputs
    } else {
      alert('Please enter a board name.');
    }
  };

  // Function to handle board selection
  const handleSelectBoard = (board) => {
    setActiveBoard(board);
  };

  // Function to handle deletion of the active board
  const handleDeleteBoard = () => {
    if (activeBoard) {
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== activeBoard.id));
      setActiveBoard(null);
    }
    setConfirmationVisible(false); // Close the confirmation popup
    resetPopupOverlay(); // Close the board popup and reset the input fields
  };

  // Function to show the confirmation popup
  const handleShowConfirmation = () => {
    setConfirmationVisible(true);
  };

  return (
    <div className="board-section" id="board-section">
      <span className="board-text" id="board-text">Boards</span>

      <div id="create-board-container">
        <button id="create-board-button" onClick={() => setPopupVisible(true)}>
          + Create New Board
        </button>
      </div>

      <div id="board-list-container">
        {boards.map((board) => (
          <button
            key={board.id}
            className={`board-button ${activeBoard && activeBoard.id === board.id ? 'active' : ''}`}
            onClick={() => handleSelectBoard(board)}
          >
            {board.name}
          </button>
        ))}
      </div>

      {/* Board Popup */}
      {popupVisible && (
        <div className="popup-overlay" id="popup-overlay" onClick={handleShowConfirmation}>
          <div className="popup-content" id="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-button" id="close-popup-button" onClick={handleShowConfirmation}>
              &times;
            </button>

            <div className="header-title" id="header-title">Create New Board</div>

            <div className="input-wrapper">
              <label htmlFor="board-name" className="popup-label">Board Name</label>
              <input
                className="popup-input"
                id="board-name"
                type="text"
                placeholder="Enter Board Name"
                value={newBoard.name}
                onChange={(e) => setNewBoard({ ...newBoard, name: e.target.value })}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="board-description" className="popup-label">Board Description</label>
              <textarea
                className="popup-textarea"
                id="board-description"
                placeholder="Enter Board Description (Optional)"
                value={newBoard.description}
                onChange={(e) => setNewBoard({ ...newBoard, description: e.target.value })}
              />
            </div>

            <div className="popup-buttons">
              <button className="cancel-button" id="cancel-button" onClick={handleShowConfirmation}>
                Cancel
              </button>
              <button className="create-board-button-form" id="create-board-button-form" onClick={createBoard}>
                Create Board
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {confirmationVisible && (
        <ConfirmationPopup
          message="Are you sure you want to delete this board?"
          subMessage="This action cannot be undone."
          onConfirm={handleDeleteBoard}
          onCancel={() => setConfirmationVisible(false)} // Close only confirmation popup
          isVisible={confirmationVisible}
        />
      )}

      {/* Active Board Details Section */}
      {activeBoard && (
        <div className="board-details">
          <h2 id="board-topic">{activeBoard.name}</h2>
          <p id="board-topic-description">{activeBoard.description || 'No description available.'}</p>
          <button onClick={() => setConfirmationVisible(true)}>Delete Board</button>
        </div>
      )}
    </div>
  );
}

export default Board;
