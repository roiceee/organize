import TaskInterface from "../../interfaces/task-interface";
import formatDate from "../../utils/dateFormatter";
import styles from "../../styles/modules/task-card.module.scss";
import _ from "lodash";
import { useCallback } from "react";

interface TaskCardProps {
  task: TaskInterface;
}

function TaskCard({ task }: TaskCardProps) {
  const getPriorityColor = useCallback(() => {
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
  }, [task.priority]);

  return (
    <div
      className="rounded-2 border border-1 bg-white d-flex p-0 gap-2"
      style={{
        maxWidth: "500px",
        overflowWrap: "break-word",
        wordBreak: "break-word",
      }}
    >
      <div className={`${styles.prioIndicator} ${getPriorityColor()}`}></div>
      <div>
        <h5>{task.title}</h5>
        <div>
          Deadline: {task.deadline === "" ? "None" : formatDate(task.deadline)}
        </div>
        <div>
          Priority:{" "}
          {task.priority === "" ? "Not specified" : _.capitalize(task.priority)}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
