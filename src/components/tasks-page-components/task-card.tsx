import { ChangeEvent, useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import clockSVG from "../../images/clock.svg";
import prioritySVG from "../../images/priority.svg";
import TaskInterface from "../../interfaces/task-interface";
import styles from "../../styles/modules/task-card.module.scss";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import {
  getDeadlineColor,
  getPriorityColor,
} from "../../styles/style-scripts/task-styles-util";
import { processDeadline, processPriority } from "../../utils/task-utils";
import CardDetailRow from "../util-components/card-detail-row";
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
        className={`d-flex flex-column p-0 ${utilStyles.hoverable} ${
          styles.rounded
        } ${task.isDone ? "bg-light" : ""}`}
        style={{
          maxWidth: "300px",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        <div
          className={`${styles.prioIndicator} ${getPriorityColor(task)}`}
        ></div>
        <div className={`p-1 rounded-bottom ${styles.taskCardBorder}`}>
          <h5
            className={`${utilStyles.overflowEllipsis} ${
              task.isDone ? "opacity-25" : ""
            } mb-0`}
          >
            {task.title}
          </h5>
          <hr className="my-1" />
          <div style={{ fontSize: "0.75rem" }}>
            <div className={`${task.isDone ? "opacity-25" : ""}`}>
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
              {/* <CardDetailRow
                label="Status"
                valueSpan={
                  <span className={getStatusColor(task)}>
                    {processTaskStatus(task)}
                  </span>
                }
                svg={checkSVG}
              /> */}
            </div>
            <div
              className="mx-1 mt-1 d-flex gap-2 justify-content-end"
              onClick={(e) => e.stopPropagation()}
            >
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
