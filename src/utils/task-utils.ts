import formatDate from "./dateFormatter";
import _ from "lodash";
import TaskInterface from "../interfaces/task-interface";
import ProjectInterface from "../interfaces/project-interface";

function processDeadline(task: TaskInterface) {
  if (new Date(task.deadline) <= new Date()) {
    return task.isDone
      ? formatDate(task.deadline)
      : formatDate(task.deadline) + " (DUE)";
  }
  return task.deadline === "" ? "None" : formatDate(task.deadline);
}

function processPriority(task: TaskInterface) {
  return task.priority === "" ? "Not specified" : _.capitalize(task.priority);
}

function processTaskStatus(task: TaskInterface) {
  return task.isDone ? "Done" : "Pending";
}

function processDescription(element: TaskInterface | ProjectInterface) {
  return element.description === "" ? "No Description" : element.description;
}

export {
  processDeadline,
  processPriority,
  processTaskStatus,
  processDescription,
};
