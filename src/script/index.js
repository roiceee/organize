import createNavBar from "./UIComponents/navbar.js";
import {createProjectModal as loadProjectModal} from './UIComponents/projectModal.js';
import {createTaskModal as loadTaskModal, addTaskModalButton} from './UIComponents/taskModal.js';
import createProject from "./LogicComponents/Project.js";

const ProjectHolder = (() => {
    let projects = [];
    const addProject = function(project) {
        projects.push(project);
    }
    const deleteProject = function(index) {
        projects.splice(index,1);
    }
    const getLength = function() {
        return projects.length;
    }
    const getProjects = function() {
        return projects;
    }
    return {
        addProject,
        deleteProject,
        getLength,
        getProjects
    }
})();


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

function addProjectButtonEventListener() {
    const button = document.getElementById('add-project-button');
    button.addEventListener('click', () => {
        //creates new project
        //add project to view
    });
}

function renderProjects() {
    let index = 0;
    const projects = ProjectHolder.getProjects();
    const holder = document.getElementById('project-holder');
    projects.forEach((project) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span class="dropdown-item" id="project-number-${index}" data-project="${index}">${project.getName()}</span>
        `
        holder.insertBefore(listItem, holder.firstChild);
    })
}





//Execution Area
//___________________________________________________________________________________________________________

ProjectHolder.addProject(createProject("ProjectOne"))
ProjectHolder.addProject(createProject("ProjectTwo"))

loadNav();
loadModalsToDOM();
loadAddTaskButtonToDOM();
renderProjects();