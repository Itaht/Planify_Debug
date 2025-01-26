// Settings.js (React Component)
import React, { useState } from 'react';
import '/styles/popup.css';
import '/styles/settings.css';

const SettingsPopup = ({ isVisible, onClose, onEditBoard, onDeleteBoard }) => {
  const handleEditBoard = () => {
    onEditBoard();
    onClose();
  };

  const handleDeleteBoard = () => {
    if (window.confirm("Are you sure you want to delete this board? This action cannot be undone.")) {
      onDeleteBoard();
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="settings-popup-overlay" onClick={onClose}>
      <div className="settings-popup" onClick={(e) => e.stopPropagation()}>
        <p className="settings-option" onClick={handleEditBoard}>
          Edit Board
        </p>
        <p className="settings-option delete" onClick={handleDeleteBoard}>
          Delete Board
        </p>
      </div>
    </div>
  );
};

export default SettingsPopup;
