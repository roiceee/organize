import createNavBar from "./UIComponents/navbar.js";
import {createProjectModal as loadProjectModal} from './UIComponents/projectModal.js';
import {createTaskModal as loadTaskModal, addTaskModalButton} from './UIComponents/taskModal.js';
import deleteProjectModal from "./UIComponents/deleteProjectModal.js";
import {submitTaskButtonListener} from './taskLogic.js';
import {renderProjects, addProjectButtonEventListener, deleteProjectListener} from './projectLogic.js';
import { createProjectButton } from "./UIComponents/projectList.js";
import ProjectHolder from "./LogicComponents/ProjectHolderModule.js";

function loadNav() {
    const navContainer = document.getElementById('nav-container');
    navContainer.appendChild(createNavBar);
}

function loadModalsToDOM() {
    const DOMBody = document.body;
    DOMBody.appendChild(loadProjectModal());
    DOMBody.appendChild(loadTaskModal());
    DOMBody.appendChild(deleteProjectModal());
}

function loadAddTaskButton() {
    const button = document.getElementById('task-modal');
    if (button != undefined || button != null) {
        return;
    }
    const container = document.getElementById('card-container');
    container.appendChild(addTaskModalButton());
}

function loadAddProjectButton() {
    const button = document.getElementById('add-project-modal-button');
    if (button != undefined || button != null) {
        return;
    }
    const container = document.getElementById('card-container');
    container.appendChild(createProjectButton());
}

function loadProjectNameContainer() {
    const container = document.getElementById('main-body');
    const element = document.createElement('div');
    element.classList.add('container');
    element.innerHTML = `
    <h2 id="project-name"></h2>
    <button type="button" id="delete-project-trigger" class="my-0 mx-0 bg-white" data-bs-toggle="modal" data-bs-target="#delete-project-modal">Delete Project</button>
            <hr>
    `
    container.append(element);
}

function reloadProjects() {
    //load existing projects to card container
    const projectNameContainer = document.getElementById('project-name');
    projectNameContainer.textContent = "Choose a project"
    document.getElementById('delete-project-trigger').style.display = 'none';
    removeAddTaskButton();
}

function removeAddTaskButton() {
   const button = document.getElementById('task-modal');
   if (button != null) { 
        button.style.display = 'none'
    }
}

function restoreAddTaskButton() {
    const button = document.getElementById('task-modal');
   if (button != null) { 
        button.style.display = 'flex'
    }
}

function loadTaskCardContainer() {
    const container = document.getElementById('main-body');
    const element = document.createElement('div');
    element.classList.add('row', 'gap-3', "row-cols-auto", "mb-3");
    element.setAttribute('id', 'card-container');
    container.append(element);
}

function startAppLogic() {
    loadNav();
    loadModalsToDOM();
    loadProjectNameContainer();
    loadTaskCardContainer();
    renderProjects();
    reloadProjects();
    addProjectButtonEventListener();
    submitTaskButtonListener();
    deleteProjectListener();
}

export {startAppLogic as default, reloadProjects, loadAddTaskButton, loadAddProjectButton, restoreAddTaskButton}
