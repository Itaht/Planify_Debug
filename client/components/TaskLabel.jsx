// TaskLabel.js (React Component)
import React, { useState } from 'react';
import '/styles/label.css';


const TaskLabel = ({ onLabelSelect, isVisible, onClose }) => {
  const labels = [
    { color: '#A259FF', name: 'Purple' },
    { color: '#FFD93D', name: 'Yellow' },
    { color: '#53D1F0', name: 'Blue' },
    { color: '#FF773D', name: 'Orange' },
    { color: '#3D8BFF', name: 'Light Blue' },
    { color: '#FF3D71', name: 'Red' },
    { color: '#3DFF77', name: 'Green' },
  ];

  const [selectedLabel, setSelectedLabel] = useState(null);

  if (!isVisible) return null;

  const handleLabelClick = (label) => {
    setSelectedLabel(label);
  };

  const handleDone = () => {
    if (selectedLabel) {
      onLabelSelect(selectedLabel);
    }
    onClose();
  };

  return (
    <div className="label-popup-overlay">
      <div className="label-popup">
        <div className="label-options">
          {labels.map((label) => (
            <button
              key={label.color}
              className={`label-option ${selectedLabel === label ? 'selected' : ''}`}
              style={{ backgroundColor: label.color }}
              onClick={() => handleLabelClick(label)}
              aria-label={`Select ${label.name} label`}
            >
              {selectedLabel === label && '✓'}
            </button>
          ))}
        </div>
        <button className="done-button" onClick={handleDone} aria-label="Confirm label selection">
          Done
        </button>
      </div>
    </div>
  );
};

export default TaskLabel;
