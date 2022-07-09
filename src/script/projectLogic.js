
import createProject from "./LogicComponents/Project.js";
import localStorageController from "./LogicComponents/localStorageModule.js";
import ProjectHolder from "./LogicComponents/ProjectHolderModule.js";
import {renderTaskCards, removeTaskCards} from './taskLogic.js';
import {reloadProjects, loadAddTaskButton} from './initialLoad.js';
import {createProjectListContainer, createProjectListItem} from './UIComponents/projectList.js';
import { loadAddProjectButton, restoreAddTaskButton} from "./initialLoad.js";

function renderProjects() {
    const projects = ProjectHolder.getProjects();
    const holder = document.getElementById('project-holder');
    const cardContainer = document.getElementById('card-container');
    loadAddProjectButton();
    if (projects.length === 0) {
        return;
    }
    projects.forEach((project) => {
        const listItem = createProjectLI(project);
        const projectDiv = createProjectListItem(project);
        holder.insertBefore(listItem, holder.firstChild);
        cardContainer.insertBefore(projectDiv, cardContainer.firstChild);
        addProjectListener(project.index);
        addProjectListListener(project.index);
    })
}

function renderProjectList() {
    const projects = ProjectHolder.getProjects();
    const cardContainer = document.getElementById('card-container');
    loadAddProjectButton();
    if (projects.length === 0) {
        return;
    }
    projects.forEach((project) => {
        const projectDiv = createProjectListItem(project);
        cardContainer.insertBefore(projectDiv, cardContainer.firstChild);
        addProjectListListener(project.index);
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
    document.getElementById('edit-project-trigger').style.display = "block"
}

function createProjectLI(project) {
    const listItem = document.createElement('li');
    listItem.setAttribute('id', `li-${project.index}`)
        listItem.innerHTML = `
        <div class="dropdown-item" id="project-number-${project.index}" data-project="${project.index}">${project.getName()}</div>
        `
    return listItem;
}

function resetProject(index) {
    const selector = index+1;
    const listItem = document.getElementById(`li-${selector}`);
    listItem.setAttribute('id', `li-${index}`);
    const projectContainer = document.getElementById(`project-number-${selector}`);
    projectContainer.setAttribute('id', `project-number-${index}`);
    projectContainer.setAttribute('data-project', `${index}`);
}

function resetProjectListIndex(start) {
    start = Number(start);
    let end = ProjectHolder.getLength();
    for (let i = start; i < end; i++) {
        resetProject(i);
    }
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

function removeProjectFromDropdown(project) {
    ProjectHolder.isOnProject = false;
    const lastCurrent = document.querySelector(`[data-current=true]`);
    if (lastCurrent != null || lastCurrent != undefined) {
      lastCurrent.removeAttribute('data-current');
    }
    document.getElementById(`li-${project.index}`).remove();
}

function removeProjectLi() {
    const projectDivs = document.querySelectorAll('.project-li');
    if (projectDivs == null || projectDivs == undefined) {
        return;
    }
    projectDivs.forEach(div => {
        div.remove();
    })
}


function removeAddProjectButton() {
    const button = document.getElementById('add-project-modal-button');
    if (button != null || button != undefined) {
        button.remove();
    }
}

function addProjectButtonEvent() {
        const form = document.getElementById('add-project');
        const projectName = form.value;
        resetProjectForm();
        const newProject = createProject(ProjectHolder.getLength(), projectName);
        ProjectHolder.addProject(newProject);
        insertProjectToDOM(newProject);
        updateDOM();
        localStorageController.saveData(ProjectHolder.getProjects());
}


function updateDOM() {
    loadAddTaskButton();
    removeTaskCards();
    renderTaskCards();
    removeProjectLi();
    removeAddProjectButton();
    restoreAddTaskButton();
}

function updateProject(projectName) {
    const project = ProjectHolder.getCurrentProject();
    project.setName(projectName);
    updateProjectDOM(project);
}

function updateProjectDOM(project) {
    document.getElementById('project-name').textContent = project.name;
    document.getElementById(`project-number-${project.index}`).textContent = project.name;
}

function addProjectListener(projectNumber) {
    const project = document.getElementById(`project-number-${projectNumber}`);
    project.addEventListener('click', (e) => {
        const currentProjectNumber = e.target.getAttribute('data-project')
        setToCurrentProject(currentProjectNumber);
        updateProjectName(currentProjectNumber);
        updateDOM();
    })
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

function addProjectListListener(projectNumber) {
    const project = document.getElementById(`project-li-${projectNumber}`);
    project.addEventListener('click', (e) => {
        const data = e.target.getAttribute('data-project-li');
        const projectItem = document.getElementById(`project-number-${data}`);
        projectItem.click();
    })
}

function deleteProjectListener() {
    const deleteProjectButton = document.getElementById('delete-project-button');
    deleteProjectButton.addEventListener('click', () => {
        const project = ProjectHolder.getCurrentProject();
        removeProjectFromDropdown(project);
        removeTaskCards();
        reloadProjects();
        ProjectHolder.deleteCurrentProject();
        ProjectHolder.removeCurrentProjectVariable();
        resetProjectListIndex(project.index);
        renderProjectList();
        localStorageController.saveData(ProjectHolder.getProjects());
    })
}

function editProjectModalListener() {
    const editProjectButton = document.getElementById('edit-project-trigger');
    editProjectButton.addEventListener('click', (e) => {
        const currentProjectToEdit = ProjectHolder.getCurrentProject();
        document.getElementById('edit-project').value = currentProjectToEdit.name;
    })
}

function editProjectButtonListener() {
    const button = document.getElementById('edit-project-button');
    button.addEventListener('click', (e) => {
        const projectName = document.getElementById('edit-project').value;
        updateProject(projectName);
        localStorageController.saveData(ProjectHolder.getProjects());
    })
    
    document.getElementById('edit-project').addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            button.click();
        }
    })
}

export {renderProjects, addProjectButtonEventListener, deleteProjectListener, editProjectModalListener, editProjectButtonListener}