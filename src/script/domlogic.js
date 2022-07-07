import createNavBar from "./UIComponents/navbar.js";
import {createProjectModal as loadProjectModal} from './UIComponents/projectModal.js';
import {createTaskModal as loadTaskModal, addTaskModalButton, noProjectWarning} from './UIComponents/taskModal.js';
import createProject from "./LogicComponents/Project.js";
import localStorageController from "./LogicComponents/localStorageModule.js";
import ProjectHolder from "./LogicComponents/ProjectHolderModule.js";
import createTask from "./LogicComponents/Task.js";
import createTaskCard from "./UIComponents/TaskCard.js";


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

//task-related functions
//____________________________________________________________________________________

function submitTaskButtonListener() {
    const submitTaskButton = document.getElementById('submit-task-button');
    submitTaskButton.addEventListener('click', (e) => {submitTaskEvent()})
    const taskForm = document.getElementById('task-form');
    taskForm.focus();
    taskForm.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') { 
            event.preventDefault();
            submitTaskButton.click();
          }

    });
}

 function submitTaskEvent() {
    if (!ProjectHolder.isOnProject) {
        const message = "You should choose a project first."
       fireNoProjectWarning(message);
        return;
    }
    const title = document.getElementById('add-title').value;
    const date = document.getElementById('add-date').value;
    resetTaskForm();
    if (title === "") {
        const message = "Please enter task name."
        fireNoProjectWarning(message);
        return;
    }
    const task = createTask(ProjectHolder.getCurrentProjectLength(), title, date);
    ProjectHolder.addTaskToCurrentProject(task);
    localStorageController.saveData(ProjectHolder.getProjects());
    insertTaskToDOM(task);
    addDeleteTaskButtonListener(task.index);
}

function fireNoProjectWarning(message) {
    const container = document.getElementById('main-body');
           const alert = noProjectWarning(message);
           container.append(alert);
            setTimeout(() => {
                removeNoProjectWarning();
            },5000)
}

function removeNoProjectWarning() {
    const button = document.getElementById('no-project-warning-button');
    if (button === null) {
        return;
    }
    button.click();
}

function insertTaskToDOM(task) {
        const container = document.getElementById('card-container');
        const taskCard = createTaskCard(task);
        container.append(taskCard);
}

function resetTaskForm() {
    document.getElementById('task-form').reset();
}

function renderTaskCards() {
    const project = ProjectHolder.getCurrentProject();
    const holder = document.getElementById('card-container');
    
    if (project.getLength() === 0) {
        return;
    }
    project.getTasks().forEach((task) => {
        const taskCard = createTaskCard(task);
        holder.append(taskCard);
        addDeleteTaskButtonListener(task.index);
        //add delete listeners
    })
}

function removeTaskCards() {
    const tasks = document.querySelectorAll('.task-card');
    tasks.forEach((task) => {task.remove();})
}

function addDeleteTaskButtonListener(taskIndex) {
    const button = document.getElementById(`delete-button-${taskIndex}`);
    button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-delete');
        console.log(index);
        deleteTaskFromProject(index);
        deleteTaskCard(index);
        resetTaskNumber(index)
        localStorageController.saveData(ProjectHolder.getProjects());
    })
}

function deleteTaskCard(taskIndex) {
    const taskCard = document.querySelector(`[data-task-number="${taskIndex}"]`);
    taskCard.remove();
}

function deleteTaskFromProject(taskIndex) {
    ProjectHolder.deleteCurrentProjectTask(taskIndex);
}

function resetTaskNumber(start) {
    start = Number(start);
    let end = ProjectHolder.getCurrentProjectLength();
    for (let i = start; i < end; i++) {
        resetTaskCardNumber(i + 1);
    }
    
}

function resetTaskCardNumber(current) {
    const taskCard = document.querySelector(`[data-task-number="${current}"]`);
    taskCard.setAttribute('data-task-number', current - 1);
    const button = document.getElementById(`delete-button-${current}`);
    button.setAttribute('data-delete', current-1);
    button.setAttribute('id', `delete-button-${current-1}`);
}

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
