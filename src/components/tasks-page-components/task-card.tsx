import { ChangeEvent, useCallback, useEffect, useState } from "react";
import checkSVG from "../../images/check.svg";
import clockSVG from "../../images/clock.svg";
import prioritySVG from "../../images/priority.svg";
import TaskInterface from "../../interfaces/task-interface";
import styles from "../../styles/modules/task-card.module.scss";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import {
  getPriorityColor,
  getStatusColor,
  getDeadlineColor,
} from "../../styles/style-scripts/task-styles-util";
import {
  processDeadline,
  processPriority,
  processTaskStatus,
} from "../../utils/task-utils";
import CardDetailRow from "../util-components/card-detail-row";
import TaskViewModal from "./task-view-modal";
import Form from "react-bootstrap/Form";

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

  const markIsDoneHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      taskIsDoneToggler(isChecked, task);
      
    },
    [taskIsDoneToggler, task]
  );

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
          className={`${styles.prioIndicator} ${getPriorityColor(task)}`}
        ></div>
        <div className="p-1 w-100">
          <h5>{task.title}</h5>
          <div
            style={{ fontSize: "0.9rem" }}
            className="d-flex justify-content-between"
          >
            <div>
              <CardDetailRow
                label="Deadline"
                valueSpan={
                  <span className={getDeadlineColor(task)}>
                    {processDeadline(task)}
                  </span>
                }
                svg={clockSVG}
              />
              <CardDetailRow
                label="Priority"
                valueSpan={<span>{processPriority(task)}</span>}
                svg={prioritySVG}
              />
              <CardDetailRow
                label="Status"
                valueSpan={
                  <span className={getStatusColor(task)}>
                    {processTaskStatus(task)}
                  </span>
                }
                svg={checkSVG}
              />
            </div>
            <div className="align-self-end mx-1" onClick={(e) => e.stopPropagation()}>
              <Form.Check
                type="checkbox"
                label="Done"
                onChange={markIsDoneHandler}
                checked={task.isDone}
              />
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
      />
    </>
  );
}

export default TaskCard;
