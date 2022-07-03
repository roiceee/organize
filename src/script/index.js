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
    const getCurrentIndex = function() {
        return projects.length - 1;
    }
    const getProjects = function() {
        return projects;
    }
    return {
        addProject,
        deleteProject,
        getLength,
        getProjects,
        getCurrentIndex
    }
})();

loadNav();
loadModalsToDOM();
loadAddTaskButtonToDOM();
renderProjects();
addProjectButtonEventListener();

//function definition Area
//___________________________________________________________________________________________________________

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

function renderProjects() {
    let index = 0;
    const projects = ProjectHolder.getProjects();
    const holder = document.getElementById('project-holder');
    projects.forEach((project) => {
        const listItem = createProjectItem(index, project);
        holder.insertBefore(listItem, holder.firstChild);
        index++;
    })
}

function insertProjectToDOM(index, project) {
    const holder = document.getElementById('project-holder');
    holder.insertBefore(createProjectItem(index, project), holder.firstChild);
}

function createProjectItem(index, project) {
    const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span class="dropdown-item" id="project-number-${index}" data-project="${index}">${project.getName()}</span>
        `
    return listItem;
}

function addProjectButtonEventListener() {
    const button = document.getElementById('add-project-button');
    button.addEventListener('click', () => {
        const form = document.getElementById('add-project');
        const projectName = form.value;
        resetForm();
        const newProject = createProject(projectName);
        ProjectHolder.addProject(newProject);
        insertProjectToDOM(ProjectHolder.getCurrentIndex(), newProject);
    });
}

function resetForm() {
    document.getElementById('form').reset();
}


