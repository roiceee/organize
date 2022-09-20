import utilStyles from "../modules/util-styles.module.scss";
import styles from "../modules/task-card.module.scss";

function getStatusColor(taskIsDone: boolean) {
    switch (taskIsDone) {
      case true: 
      return utilStyles.colorSuccess;
      case false: 
      return utilStyles.colorDanger;
    }
  }

function getPriorityColor(taskPriority: string) {
    switch (taskPriority) {
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

export {getStatusColor, getPriorityColor}