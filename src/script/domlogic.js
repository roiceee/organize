import createNavBar from "./UIComponents/navbar.js";
import {createProjectModal as loadProjectModal} from './UIComponents/projectModal.js';
import {createTaskModal as loadTaskModal, addTaskModalButton} from './UIComponents/taskModal.js';
import deleteProjectModal from "./UIComponents/delete-project-modal.js";
import {submitTaskButtonListener} from './taskLogic.js';
import {renderProjects, addProjectButtonEventListener} from './projectLogic.js';

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
    <button id="delete-project-trigger" class="my-0 mx-0 bg-white" data-bs-toggle="modal" data-bs-target="#delete-project-modal">Delete Project</button>
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
