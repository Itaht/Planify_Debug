// ConfirmationPopup.js (React Component)
import React from 'react';
import '/styles/confirmation.css';


const ConfirmationPopup = ({
  message = "Are you sure?",
  subMessage = "This action cannot be undone.",
  onConfirm,
  onCancel,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="confirmation-popup-overlay">
      <div className="confirmation-popup">
        <h3>{message}</h3>
        <p>{subMessage}</p>
        <div className="confirmation-buttons">
          <button className="cancel-button" onClick={onCancel} aria-label="Cancel action">
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm} aria-label="Confirm action">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
