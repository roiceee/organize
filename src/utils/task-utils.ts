import formatDate from "./dateFormatter";
import _ from "lodash";
import TaskInterface from "../interfaces/task-interface";
import ProjectInterface from "../interfaces/project-interface";

function processDeadline(task: TaskInterface) {
  if (!checkTaskIsDue(task)) {
    return task.deadline === "" ? "None" : formatDate(task.deadline);
  }
  return task.isDone
    ? formatDate(task.deadline)
    : formatDate(task.deadline) + " (DUE)";
}

function processPriority(task: TaskInterface) {
  return task.priority === "" ? "None" : _.capitalize(task.priority);
}

function processTaskStatus(task: TaskInterface) {
  return task.isDone ? "Done" : "Pending";
}

function processDescription(element: TaskInterface | ProjectInterface) {
  return element.description === "" ? "No Description" : element.description;
}

//returns true if task's deadline is less than or equal to current date
function checkTaskIsDue(task: TaskInterface): boolean {
  if (task.isDone) {
    return false;
  }
  return new Date(task.deadline) <= new Date();
}

export {
  processDeadline,
  processPriority,
  processTaskStatus,
  processDescription,
  checkTaskIsDue,
};
