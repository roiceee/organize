import createNavBar from "./UIComponents/navbar.js";
import {createProjectModal as loadProjectModal} from './UIComponents/projectModal.js';
import {createTaskModal as loadTaskModal, addTaskModalButton, noProjectWarning} from './UIComponents/taskModal.js';
import createProject from "./LogicComponents/Project.js";

const localStorageController = (() => {
    const data = window.localStorage.getItem("projects");
    const saveData = function(projects) {
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
    let isOnProject = false;
    localStorageController.getData() === null ? projects = [] : projects = convertProjectJSON();
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
        getCurrentIndex,
        isOnProject
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


//project related functions
// ___________________________________________________________________________________
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
        addProjectListener(index);
        index++;
    })
}

function insertProjectToDOM(index, project) {
    const holder = document.getElementById('project-holder');
    holder.insertBefore(createProjectLI(index, project), holder.firstChild);
    setToCurrentProject(index);
    addProjectListener(index);
    updateProjectName(index);
}

function createProjectLI(index, project) {
    const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="dropdown-item" id="project-number-${index}" data-project="${index}">${project.getName()}</div>
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

function addProjectListener(projectNumber) {
    const project = document.getElementById(`project-number-${projectNumber}`);
    project.addEventListener('click', (e) => {
        const currentProjectNumber = e.target.getAttribute('data-project')
        setToCurrentProject(currentProjectNumber);
        updateProjectName(currentProjectNumber);
    })
}

function resetForm() {
    document.getElementById('project-form').reset();
}

function updateProjectName(currentProjectNumber) {
    const currentProject = document.getElementById(`project-number-${currentProjectNumber}`)
    const container = document.getElementById('project-name');
    container.textContent = currentProject.textContent;
}

function setToCurrentProject(projectNumber) {
    ProjectHolder.isOnProject = true;
   const lastCurrent = document.querySelector(`[data-current=true]`);
   if (lastCurrent != null || lastCurrent != undefined) {
     lastCurrent.removeAttribute('data-current');
   }
   const currentProject = document.getElementById(`project-number-${projectNumber}`);
   currentProject.setAttribute('data-current', true);
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

// ___________________________________________________________________________________
//project related functions


//task-related functions
//____________________________________________________________________________________

function addSubmitTaskButtonListener() {
    const submitTaskButton = document.getElementById('submit-task-button');
    submitTaskButton.addEventListener('click', (e) => {
        if (!ProjectHolder.isOnProject) {
            const container = document.getElementById('main-body');
           const alert = noProjectWarning();
           container.append(alert);
            setTimeout(() => {
                removeNoProjectWarning();
            },5000)
            return;
        }
    })
}

function removeNoProjectWarning() {
    const button = document.getElementById('no-project-warning-button');
    if (button === null) {
        return;
    }
    button.click();
}



//____________________________________________________________________________________
//body-related functions


//Execution Area
//___________________________________________________________________________________________________________


export default function startAppLogic() {
    loadNav();
    loadModalsToDOM();
    loadAddTaskButtonToDOM();
    loadProjectNameContainer();
    renderProjects();
    addProjectButtonEventListener();
    addSubmitTaskButtonListener();
}
