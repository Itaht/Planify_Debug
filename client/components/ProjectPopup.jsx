import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '/styles/popup.css';
import '/styles/project.css';
import ConfirmationPopup from './ConfirmationPopup';

export function ProjectPopup() {
  // State management
  const [projects, setProjects] = useState([]); // State to store projects
  const [popupVisible, setPopupVisible] = useState(false); // State to control popup visibility
  const [confirmationVisible, setConfirmationVisible] = useState(false); // State for confirmation popup
  const [newProject, setNewProject] = useState({ name: '', description: '' }); // State for new project input
  const [activeProject, setActiveProject] = useState(null); // State to store the currently selected active project

  // Function to reset and hide the popup overlay
  const resetPopupOverlay = () => {
    setPopupVisible(false);
    setNewProject({ name: '', description: '' }); // Reset the input fields
  };

  // Function to create a new project
  const createProject = (event) => {
    event.preventDefault();
    const projectName = newProject.name.trim();
    const projectDescription = newProject.description.trim();

    if (projectName) {
      const newProjectData = {
        id: uuidv4(),
        name: projectName,
        description: projectDescription,
      };

      setProjects((prevProjects) => [...prevProjects, newProjectData]);
      resetPopupOverlay(); // Close the popup and reset inputs
    } else {
      alert('Please enter a project name.');
    }
  };

  return (
    <div className="project-section" id="project-section">
      <div id="create-project-container">
        <button id="create-project-button" className="create-project-button" onClick={() => setPopupVisible(true)}>
          + Create New Project
        </button>
      </div>

      <div id="project-list-container">
        {projects.map((project) => (
          <button
            key={project.id}
            className={`project-button ${activeProject && activeProject.id === project.id ? 'active' : ''}`}
            onClick={() => setActiveProject(project)}
          >
            {project.name}
          </button>
        ))}
      </div>

      {/* Project Popup Overlay */}
      {popupVisible && (
        <div className="project-popup-overlay" id="project-popup-overlay">
          <div className="project-popup" id="project-popup">
            <div className="popup-header" id="popup-header">
              <div className="header-title" id="header-title">Create New Project</div>
              <button className="close-popup-button" onClick={() => setPopupVisible(false)} aria-label="Close project creation popup">
                ✖
              </button>
            </div>
            <div className="input-wrapper">
              <label htmlFor="project-name" className="popup-label">Project Name</label>
              <input
                className="popup-input"
                id="project-name"
                type="text"
                placeholder="Enter project name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="project-description" className="popup-label">Project Description (Optional)</label>
              <textarea
                className="popup-textarea"
                id="project-description"
                placeholder="Enter project description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <div className="popup-buttons">
                <button type="button" className="cancel-button" id="cancel-button" onClick={() => setPopupVisible(false)} aria-label="Cancel project creation">
                  Cancel
                </button>
                <button type="submit" className="create-project-button-form" id="create-project-button-form" onClick={createProject}>
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {confirmationVisible && (
        <ConfirmationPopup
          message="Are you sure you want to delete this project?"
          subMessage="This action cannot be undone."
          onConfirm={() => setConfirmationVisible(false)}
          onCancel={() => setConfirmationVisible(false)}
          isVisible={confirmationVisible}
        />
      )}

      {/* Active Project Details Section */}
      {activeProject && (
        <div className="project-details">
          <h2 id="project-topic">{activeProject.name}</h2>
          <p id="project-topic-description">{activeProject.description || 'No description available.'}</p>
          <button onClick={() => setConfirmationVisible(true)}>Delete Project</button>
        </div>
      )}
    </div>
  );
}

export default ProjectPopup;
