import TaskInterface from "../../interfaces/task-interface";
import formatDate from "../../utils/dateFormatter";
import styles from "../../styles/modules/task-card.module.scss";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import _ from "lodash";
import TaskViewModal from "./task-view-modal";
import { useCallback, useState } from "react";
import { processDeadline, processPriority } from "../../utils/task-utils";


interface TaskCardProps {
  task: TaskInterface;
}

function TaskCard({ task }: TaskCardProps) {
  const [taskViewModalState, setTaskViewModalState] = useState<boolean>(false);

  const showTaskViewModal = useCallback(() => {
    setTaskViewModalState(true);
  }, []);

  const hideTaskViewModal = useCallback(() => {
    setTaskViewModalState(false);
  }, []);

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
    <>
      <div
        onClick={showTaskViewModal}
        className={`rounded-2 border border-1 bg-white d-flex p-0 gap-2 ${utilStyles.hoverable}`}
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
            Deadline:{" "}
            {processDeadline(task.deadline)}
          </div>
          <div>
            Priority:{" "}
           {processPriority(task.priority)}
          </div>
        </div>
      </div>
      <TaskViewModal task={task} show={taskViewModalState} onHide={hideTaskViewModal} />
    </>
  );
}

export default TaskCard;
