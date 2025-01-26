// ProjectPopup.js (React Component)
import React, { useState } from 'react';
import '/styles/popup.css';


const ProjectPopup = ({
  isVisible,
  onClose,
  onCreateProject,
}) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleCreateProject = (event) => {
    event.preventDefault();
    if (projectName.trim()) {
      onCreateProject({ name: projectName, description: projectDescription });
      setProjectName("");
      setProjectDescription("");
      onClose();
    } else {
      alert("Please enter a project name.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="project-popup-overlay">
      <div className="project-popup">
        <div className="popup-header">
          <h3>Create New Project</h3>
          <button className="close-popup-button" onClick={onClose} aria-label="Close project creation popup">
            ✖
          </button>
        </div>
        <form onSubmit={handleCreateProject} className="popup-form">
          <label htmlFor="project-name">Project Name</label>
          <input
            id="project-name"
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <label htmlFor="project-description">Project Description (Optional)</label>
          <textarea
            id="project-description"
            placeholder="Enter project description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <div className="popup-buttons">
            <button type="button" className="cancel-button" onClick={onClose} aria-label="Cancel project creation">
              Cancel
            </button>
            <button type="submit" className="create-button" aria-label="Create project">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectPopup;
