import React from 'react';
import '/styles/confirmation.css'; // Ensure this path is correct for your CSS

const ConfirmationPopup = ({
  onConfirm,
  onCancel,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div id="confirmation-popup" className="confirmation-popup-overlay">
      <div id="confirmation-content" className="confirmation-popup">
        <h3>Discard changes?</h3>
        <p>If you go back now, you will lose any changes you’ve made.</p>
        <div className="confirmation-buttons">
          <button id="cancel-discard-button" className="cancel-button" onClick={onCancel} aria-label="Cancel action">
            Cancel
          </button>
          <button id="discard-button" className="confirm-button" onClick={onConfirm} aria-label="Confirm action">
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
