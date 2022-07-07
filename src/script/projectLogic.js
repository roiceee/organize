
import createProject from "./LogicComponents/Project.js";
import localStorageController from "./LogicComponents/localStorageModule.js";
import ProjectHolder from "./LogicComponents/ProjectHolderModule.js";
import {renderTaskCards, removeTaskCards} from './taskLogic.js';

function renderProjects() {
    const projects = ProjectHolder.getProjects();
    const holder = document.getElementById('project-holder');
    if (projects.length === 0) {
        return;
    }
    projects.forEach((project) => {
        const listItem = createProjectLI(project);
        holder.insertBefore(listItem, holder.firstChild);
        addProjectListener(project.index);
    })
}

function insertProjectToDOM(project) {
    const index = project.index;
    const holder = document.getElementById('project-holder');
    holder.insertBefore(createProjectLI(project), holder.firstChild);
    setToCurrentProject(index);
    addProjectListener(index);
    updateProjectName(index);
    addDeleteProjectModalTrigger();
}

function addDeleteProjectModalTrigger() {
    document.getElementById('delete-project-trigger').style.display = "block"
}

function createProjectLI(project) {
    const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="dropdown-item" id="project-number-${project.index}" data-project="${project.index}">${project.getName()}</div>
        `
    return listItem;
}

function resetProjectForm() {
    document.getElementById('project-form').reset();
}

function updateProjectName(currentProjectNumber) {
    const currentProject = document.getElementById(`project-number-${currentProjectNumber}`)
    const container = document.getElementById('project-name');
    container.textContent = currentProject.textContent;
    addDeleteProjectModalTrigger()
}

function setToCurrentProject(projectNumber) {
   ProjectHolder.isOnProject = true;
   ProjectHolder.setCurrentProject(projectNumber);
   const lastCurrent = document.querySelector(`[data-current=true]`);
   if (lastCurrent != null || lastCurrent != undefined) {
     lastCurrent.removeAttribute('data-current');
   }
   const currentProject = document.getElementById(`project-number-${projectNumber}`);
   currentProject.setAttribute('data-current', true);
}

function addProjectButtonEventListener() {
    const button = document.getElementById('add-project-button');
    button.addEventListener('click', () => {addProjectButtonEvent();});
    const projectForm = document.getElementById('project-form');
    projectForm.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') { 
            event.preventDefault();
            button.click();
          }
    });
}

function addProjectButtonEvent() {
        const form = document.getElementById('add-project');
        const projectName = form.value;
        resetProjectForm();
        const newProject = createProject(ProjectHolder.getLength(), projectName);
        ProjectHolder.addProject(newProject);
        insertProjectToDOM(newProject);
        removeTaskCards();
        renderTaskCards();
        localStorageController.saveData(ProjectHolder.getProjects());
}

function addProjectListener(projectNumber) {
    const project = document.getElementById(`project-number-${projectNumber}`);
    project.addEventListener('click', (e) => {
        const currentProjectNumber = e.target.getAttribute('data-project')
        setToCurrentProject(currentProjectNumber);
        updateProjectName(currentProjectNumber);
        removeTaskCards();
        renderTaskCards();
    })
}

export {renderProjects, addProjectButtonEventListener}