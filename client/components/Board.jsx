import React, { useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup.jsx";
import '/styles/board.css';

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [newBoard, setNewBoard] = useState({ name: "", description: "" });
  const [activeBoard, setActiveBoard] = useState(null);

  const handleCreateBoard = () => {
    const trimmedName = newBoard.name.trim();
    if (trimmedName === "") {
      alert("Board name cannot be empty.");
      return;
    }

    const newBoardData = {
      id: crypto.randomUUID(), // Use UUID for unique IDs
      name: trimmedName,
      description: newBoard.description.trim(),
    };

    setBoards([...boards, newBoardData]);
    setPopupVisible(false);
    setNewBoard({ name: "", description: "" });
  };

  const handleSelectBoard = (board) => {
    setActiveBoard(board);
  };

  const handleDeleteBoard = () => {
    if (activeBoard) {
      setBoards(boards.filter((board) => board.id !== activeBoard.id));
      setActiveBoard(null);
    }
    setConfirmationVisible(false);
  };

  return (
    <div className="board-container">
      {/* Header Section */}
      <div className="board-header">
        <button onClick={() => setPopupVisible(true)}>+ Create New Board</button>
      </div>

      {/* Board List Section */}
      <div className="board-list">
        {boards.map((board) => (
          <button
            key={board.id}
            className={`board-button ${activeBoard?.id === board.id ? "active" : ""}`}
            onClick={() => handleSelectBoard(board)}
          >
            {board.name}
          </button>
        ))}
      </div>

      {/* Popup for Creating Board */}
      {popupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Create New Board</h3>
            <input
              type="text"
              placeholder="Board Name"
              value={newBoard.name}
              onChange={(e) => setNewBoard({ ...newBoard, name: e.target.value })}
            />
            <textarea
              placeholder="Board Description (Optional)"
              value={newBoard.description}
              onChange={(e) => setNewBoard({ ...newBoard, description: e.target.value })}
            />
            <div className="popup-buttons">
              <button onClick={handleCreateBoard}>Create</button>
              <button onClick={() => setPopupVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup for Deleting Board */}
      {confirmationVisible && (
        <ConfirmationPopup
          message="Are you sure you want to delete this board?"
          onConfirm={handleDeleteBoard}
          onCancel={() => setConfirmationVisible(false)}
        />
      )}

      {/* Active Board Details Section */}
      {activeBoard && (
        <div className="board-details">
          <h2>{activeBoard.name}</h2>
          <p>{activeBoard.description || "No description available."}</p>
          <button onClick={() => setConfirmationVisible(true)}>Delete Board</button>
        </div>
      )}
    </div>
  );
};

export default Board;
