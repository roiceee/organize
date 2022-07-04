import createNavBar from "./UIComponents/navbar.js";
import {createProjectModal as loadProjectModal} from './UIComponents/projectModal.js';
import {createTaskModal as loadTaskModal, addTaskModalButton} from './UIComponents/taskModal.js';
import createProject from "./LogicComponents/Project.js";

const localStorageController = (() => {
    const data = window.localStorage.getItem("projects");
    const saveData = function(projects) {
        console.log("typeof projects " + typeof(projects))
        projects.forEach(project => {
            console.log(project.getName());
        })
        window.localStorage.setItem("projects", JSON.stringify(projects));
    }
    const getData = function() {
        return data;
    }
    return {
        saveData,
        getData
    }
})();

function convertProjectJSON() {
    //returns an array of project objects
    let projects = JSON.parse(localStorageController.getData());
    for (let i = 0; i < projects.length; i++) {
        const projectObject = createProject(projects[i].name);
        projectObject.setTasks(projects[i].tasks);
        projects[i] = projectObject;
    }
    return projects;
}

const ProjectHolder = (() => {
    let projects;
    localStorageController.getData() === null ? projects = [] : projects = convertProjectJSON();
    console.log("Projects = " + projects);
    console.log("Projects length = " + projects[0])
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
    if (projects.length === 0) {
        return;
    }
    projects.forEach((project) => {
        const listItem = createProjectLI(index, project);
        holder.insertBefore(listItem, holder.firstChild);
        index++;
    })
}

function insertProjectToDOM(index, project) {
    const holder = document.getElementById('project-holder');
    holder.insertBefore(createProjectLI(index, project), holder.firstChild);
}

function createProjectLI(index, project) {
    const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span class="dropdown-item fw-bolder" id="project-number-${index}" data-project="${index}">${project.getName()}</span>
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
        localStorageController.saveData(ProjectHolder.getProjects());
        insertProjectToDOM(ProjectHolder.getCurrentIndex(), newProject);
        
    });
}

function resetForm() {
    document.getElementById('form').reset();
}






//Execution Area
//___________________________________________________________________________________________________________


export default function startAppLogic() {
    loadNav();
    loadModalsToDOM();
    loadAddTaskButtonToDOM();
    renderProjects();
    addProjectButtonEventListener();
}
