import {noProjectWarning} from './UIComponents/taskModal.js';
import localStorageController from "./LogicComponents/localStorageModule.js";
import ProjectHolder from "./LogicComponents/ProjectHolderModule.js";
import createTask from "./LogicComponents/Task.js";
import createTaskCard from "./UIComponents/TaskCard.js";

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
        container.insertBefore(taskCard, container.firstChild);
}

function resetTaskForm() {
    document.getElementById('task-form').reset();
}

function renderTaskCards() {
    const project = ProjectHolder.getCurrentProject();
    
    if (project.getLength() === 0) {
        return;
    }
    project.getTasks().forEach((task) => {
        insertTaskToDOM(task);
        addDeleteTaskButtonListener(task.index);
    })
}

function removeTaskCards() {
    const tasks = document.querySelectorAll('.task-card');
    tasks.forEach((task) => {task.remove();})
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

export {submitTaskButtonListener, renderTaskCards, removeTaskCards};