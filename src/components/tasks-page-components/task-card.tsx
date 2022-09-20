import { useCallback, useState } from "react";
import TaskInterface from "../../interfaces/task-interface";
import styles from "../../styles/modules/task-card.module.scss";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import {
  getPriorityColor,
  getStatusColor,
} from "../../styles/style-scripts/task-styles-util";
import {
  processDeadline,
  processPriority,
  processTaskStatus,
} from "../../utils/task-utils";
import TaskDetailRow from "../util-components/task-detail-row";
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
        <div
          className={`${styles.prioIndicator} ${getPriorityColor(
            task.priority
          )}`}
        ></div>
        <div className="p-1">
          <h5>{task.title}</h5>
          <div style={{ fontSize: "0.9rem" }}>
            <TaskDetailRow
              label="Status"
              valueSpan={
                <span className={getStatusColor(task.isDone)}>
                  {processTaskStatus(task.isDone)}
                </span>
              }
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              }
            />
            <TaskDetailRow
              label="Priority"
              valueSpan={<span>{processPriority(task.priority)}</span>}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              }
            />
            <TaskDetailRow
              label="Deadline"
              valueSpan={<span>{processDeadline(task.deadline)}</span>}
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              }
            />
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
