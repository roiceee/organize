import { useCallback, useState } from "react";
import TaskInterface from "../../interfaces/task-interface";
import styles from "../../styles/modules/task-card.module.scss";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import { getPriorityColor, getStatusColor } from "../../styles/style-scripts/task-styles-util";
import {
  processDeadline,
  processPriority,
  processTaskStatus
} from "../../utils/task-utils";
import TaskViewModal from "./task-view-modal";


interface TaskCardProps {
  task: TaskInterface;
  editTaskHandler: (updatedTask: TaskInterface) => void;
  deleteTaskHandler: (taskToDelete: TaskInterface) => void;
  taskIsDoneToggler: (isDone: boolean, task: TaskInterface) => void;
}

function TaskCard({
  task,
  editTaskHandler,
  deleteTaskHandler,
  taskIsDoneToggler,
}: TaskCardProps) {
  const [taskViewModalState, setTaskViewModalState] = useState<boolean>(false);

  const showTaskViewModal = useCallback(() => {
    setTaskViewModalState(true);
  }, []);

  const hideTaskViewModal = useCallback(() => {
    setTaskViewModalState(false);
  }, []);



  return (
    <>
      <div
        onClick={showTaskViewModal}
        className={`border border-1 bg-white d-flex p-0 gap-2 ${utilStyles.hoverable} ${styles.rounded}`}
        style={{
          maxWidth: "500px",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        <div className={`${styles.prioIndicator} ${getPriorityColor(task.priority)}`}></div>
        <div className="p-1">
          <h5>{task.title}</h5>
          <div style={{ fontSize: "0.9rem" }}>
            <div>
              <b>Status:</b> <span className={getStatusColor(task.isDone)}>{processTaskStatus(task.isDone)}</span>
            </div>
            <div>
              <b>Priority:</b> {processPriority(task.priority)}
            </div>
            <div>
              <b>Deadline:</b> {processDeadline(task.deadline)}
            </div>
          </div>
        </div>
      </div>
      <TaskViewModal
        task={task}
        show={taskViewModalState}
        onHide={hideTaskViewModal}
        editTaskHandler={editTaskHandler}
        deleteTaskHandler={deleteTaskHandler}
        taskIsDoneToggler={taskIsDoneToggler}
      />
    </>
  );
}

export default TaskCard;
