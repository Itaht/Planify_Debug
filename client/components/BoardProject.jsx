// BoardProject.js (React Component)
import React, { useState } from 'react';
import '/styles/project.css';

const BoardProject = () => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const handleCreateProject = () => {
    const trimmedName = newProject.name.trim();
    if (trimmedName === '') {
      alert('Project name cannot be empty.');
      return;
    }

    const newProjectData = {
      id: crypto.randomUUID(),
      name: trimmedName,
      description: newProject.description.trim(),
    };

    setProjects([...projects, newProjectData]);
    setNewProject({ name: '', description: '' });
  };

  const handleSelectProject = (project) => {
    setActiveProject(project);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((project) => project.id !== projectId));
      if (activeProject?.id === projectId) {
        setActiveProject(null);
      }
    }
  };

  return (
    <div className="project-container">
      {/* Project Header */}
      <div className="project-header">
        <button onClick={() => setSettingsVisible(!settingsVisible)}>
          Project Settings
        </button>
      </div>

      {/* Project List */}
      <div className="project-list">
        {projects.map((project) => (
          <button
            key={project.id}
            className={`project-button ${
              activeProject?.id === project.id ? 'active' : ''
            }`}
            onClick={() => handleSelectProject(project)}
          >
            {project.name}
          </button>
        ))}
      </div>

      {/* Active Project Details */}
      {activeProject && (
        <div className="project-details">
          <h2>{activeProject.name}</h2>
          <p>{activeProject.description || 'No description available.'}</p>
          <button
            onClick={() => handleDeleteProject(activeProject.id)}
          >
            Delete Project
          </button>
        </div>
      )}

      {/* Create Project Popup */}
      {settingsVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Create New Project</h3>
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
            />
            <textarea
              placeholder="Project Description (Optional)"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
            <div className="popup-buttons">
              <button onClick={handleCreateProject}>Create</button>
              <button onClick={() => setSettingsVisible(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardProject;
