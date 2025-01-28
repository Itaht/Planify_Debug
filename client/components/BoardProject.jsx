import React, { useState, useRef, useEffect } from 'react';
import '/styles/project.css';
import '/styles/sidebar.css';

const BoardProject = () => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const projectBoxRef = useRef(null);
  const projectNameDisplayRef = useRef(null);
  const projectDescriptionDisplayRef = useRef(null);
  const projectListContainerRef = useRef(null);
  const boardSectionRef = useRef(null);
  const projectSectionRef = useRef(null);

  const defaultProjectName = 'No Project Selected';
  const defaultProjectDescription = 'No description available';

  // Create and append the triangle symbol and project settings icon
  useEffect(() => {
    if (projectBoxRef.current) {
      // Create and add the triangle symbol
      const triangleSymbol = document.createElement('div');
      triangleSymbol.id = 'triangle-symbol';
      triangleSymbol.classList.add('triangle-right'); // Default direction
      projectBoxRef.current.prepend(triangleSymbol);

      // Create and add the project settings icon
      const projectSettingsIcon = document.createElement('img');
      projectSettingsIcon.id = 'project-settings-icon';
      projectSettingsIcon.src = 'assets/setting.svg'; // Path to your settings.svg
      projectSettingsIcon.alt = 'Project Settings';
      projectSettingsIcon.classList.add('project-settings-icon');
      projectBoxRef.current.appendChild(projectSettingsIcon);

      // Create the project settings popup
      const projectSettingsPopup = document.createElement('div');
      projectSettingsPopup.id = 'project-settings-popup';
      projectSettingsPopup.classList.add('hidden', 'project-settings-popup');
      projectSettingsPopup.innerHTML = `
        <p class="project-settings-option" id="share-project">Share Project</p>
        <p class="project-settings-option" id="edit-project">Edit Project</p>
        <p class="project-settings-option delete" id="delete-project">Delete Project</p>
      `;
      document.body.appendChild(projectSettingsPopup);

      // Position the popup near the settings icon
      const positionPopup = () => {
        const rect = projectSettingsIcon.getBoundingClientRect();
        projectSettingsPopup.style.top = `${rect.bottom + window.scrollY}px`;
        projectSettingsPopup.style.left = `${rect.left + window.scrollX}px`;
      };

      // Toggle the popup visibility
      projectSettingsIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click propagation
        if (projectSettingsPopup.classList.contains('hidden')) {
          document.querySelectorAll('.project-settings-popup').forEach((popup) =>
            popup.classList.add('hidden')
          );
          positionPopup();
          projectSettingsPopup.classList.remove('hidden');
        } else {
          projectSettingsPopup.classList.add('hidden');
        }
      });

      // Hide the popup when clicking outside
      document.addEventListener('click', () => {
        projectSettingsPopup.classList.add('hidden');
      });

      // Update dynamic line position
      const updateDynamicLine = () => {
        let dynamicLine = document.querySelector('.dynamic-line');
        if (!dynamicLine) {
          dynamicLine = document.createElement('div');
          dynamicLine.className = 'dynamic-line';
          if (projectSectionRef.current) {
            projectSectionRef.current.appendChild(dynamicLine);
          }
        }

        const lastProjectButton = projectListContainerRef.current.querySelector('.project-button:last-child');
        if (lastProjectButton) {
          const lastButtonRect = lastProjectButton.getBoundingClientRect();
          const projectSectionRect = projectSectionRef.current.getBoundingClientRect();
          const offsetVh = ((lastButtonRect.bottom - projectSectionRect.top) / window.innerHeight) * 100;
          dynamicLine.style.top = `calc(${offsetVh}vh + 2.5vh)`; // Adjust for spacing
          dynamicLine.style.left = '0';
          dynamicLine.style.width = '100%';
          dynamicLine.style.display = 'block';
        } else {
          dynamicLine.style.display = 'none';
        }
      };

      // Initial dynamic line setup
      updateDynamicLine();
    }
  }, []);  // Empty dependency array ensures the effect runs only once after the first render

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
    projectNameDisplayRef.current.textContent = project.name;
    projectDescriptionDisplayRef.current.textContent = project.description || defaultProjectDescription;
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((project) => project.id !== projectId));
      if (activeProject?.id === projectId) {
        setActiveProject(null);
      }
    }
  };

  const toggleSettingsVisibility = () => {
    setSettingsVisible(!settingsVisible);
  };

  return (
    <div id="project-container" className="clickable">
      {/* Project Box with id and class */}
      <div id="projectbox" ref={projectBoxRef} className="projectbox">
        <div id="projectname" ref={projectNameDisplayRef}>Project Name</div>
        <div id="projectdescription" ref={projectDescriptionDisplayRef}>Project Description</div>
      </div>

      <div id="project-list-container" className="project-list" ref={projectListContainerRef}>
        {projects.map((project) => (
          <button
            key={project.id}
            className={`project-button ${activeProject && activeProject.id === project.id ? 'active' : ''}`}
            onClick={() => handleSelectProject(project)}
          >
            {project.name}
          </button>
        ))}
      </div>

      {activeProject && (
        <div id="project-section" className="project-details" ref={projectSectionRef}>
          <h2 id="projectname" ref={projectNameDisplayRef}>{activeProject.name}</h2>
          <p id="projectdescription" ref={projectDescriptionDisplayRef}>
            {activeProject.description || 'No description available.'}
          </p>
          <button onClick={() => handleDeleteProject(activeProject.id)}>
            Delete Project
          </button>
        </div>
      )}

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

      <button onClick={toggleSettingsVisibility}>Create New Project</button>
    </div>
  );
};

export default BoardProject;
