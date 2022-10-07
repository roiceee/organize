import utilStyles from "../modules/util-styles.module.scss";
import styles from "../modules/task-card.module.scss";
import TaskInterface from "../../interfaces/task-interface";
import { checkTaskIsDue } from "../../utils/task-utils";

function getStatusColor(task: TaskInterface) {
    switch (task.isDone) {
      case true: 
      return utilStyles.colorSuccess;
      case false: 
      return utilStyles.colorDanger;
    }
  }

function getPriorityColor(task: TaskInterface) {
    switch (task.priority) {
      case "low":
        return styles.lowPriority;
      case "medium":
        return styles.mediumPriority;
      case "high":
        return styles.highPriority;
      default:
        return styles.noPriority;
    }
}

function getDeadlineColor(task: TaskInterface) {
  if (!checkTaskIsDue(task)) {
    return "";
  }
  return utilStyles.colorDanger;
}

export {getStatusColor, getPriorityColor, getDeadlineColor}