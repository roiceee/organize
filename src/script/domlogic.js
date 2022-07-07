import createNavBar from "./UIComponents/navbar.js";
import {createProjectModal as loadProjectModal} from './UIComponents/projectModal.js';
import {createTaskModal as loadTaskModal, addTaskModalButton} from './UIComponents/taskModal.js';
import createProject from "./LogicComponents/Project.js";
import localStorageController from "./LogicComponents/localStorageModule.js";
import ProjectHolder from "./LogicComponents/ProjectHolderModule.js";
import {submitTaskButtonListener, renderTaskCards, removeTaskCards} from './taskLogic.js';


function loadNav() {
    const navContainer = document.getElementById('nav-container');
    navContainer.appendChild(createNavBar);
}

function loadModalsToDOM() {
    const DOMBody = document.body;
    DOMBody.appendChild(loadProjectModal());
    DOMBody.appendChild(loadTaskModal());
}

function loadAddTaskButtonToDOM() {
    const DOMBody = document.body;
    DOMBody.appendChild(addTaskModalButton());
}

function loadProjectNameContainer() {
    const container = document.getElementById('main-body');
    const element = document.createElement('div');
    element.classList.add('container');
    element.innerHTML = `
    <h2 id="project-name">Choose a project on the "Projects" tab above.</h2>
            <hr>
    `
    container.append(element);
}

function loadTaskCardContainer() {
    const container = document.getElementById('main-body');
    const element = document.createElement('div');
    element.classList.add('row', 'gap-3');
    element.setAttribute('id', 'card-container');
    container.append(element);
}

//project related functions
// ___________________________________________________________________________________
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
        localStorageController.saveData(ProjectHolder.getProjects());
        insertProjectToDOM(newProject);
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

// ___________________________________________________________________________________
//project related functions


export default function startAppLogic() {
    loadNav();
    loadModalsToDOM();
    loadAddTaskButtonToDOM();
    loadProjectNameContainer();
    loadTaskCardContainer();
    renderProjects();
    addProjectButtonEventListener();
    submitTaskButtonListener();
}
