import Modal from "react-bootstrap/Modal";
import TaskInterface from "../../interfaces/task-interface";
import _ from "lodash";
import {
  processDeadline,
  processDescription,
  processPriority,
  processTaskStatus,
} from "../../utils/task-utils";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import DescriptionPopover from "./description-accordion";
import EditTaskDiv from "./edit-task-div";

interface TaskViewModalProps {
  task: TaskInterface;
  show: boolean;
  onHide: () => void;
  editTaskHandler: (updatedTask: TaskInterface) => void;
}

function TaskViewModal({
  task,
  show,
  onHide,
  editTaskHandler,
}: TaskViewModalProps) {
  const [isOnEditState, setIsOnEditState] = useState<boolean>(false);
  const [isOnDeleteState, setIsOnDeleteState] = useState<boolean>(false);

  const setToEditMode = useCallback(() => {
    setIsOnEditState(true);
  }, []);

  const setToViewMode = useCallback(() => {
    setIsOnEditState(false);
  }, []);

  const setToDeleteMode = useCallback(() => {
    setIsOnDeleteState(true);
  }, []);

  const cancelDeleteMode = useCallback(() => {
    setIsOnDeleteState(false);
  }, []);

  const getTaskUnderlineColor = useCallback(() => {
    switch (task.priority) {
      case "high":
        return utilStyles.underlineDanger;
      case "medium":
        return utilStyles.underlineWarning;
      case "low":
        return utilStyles.underlineInfo;
      default:
        return utilStyles.underline;
    }
  }, [task.priority]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      aria-labelledby="task-view-modal"
    >
      <Modal.Header className="bg-primary text-light ">
        <Modal.Title id="task-view-modal" style={{ fontSize: "1rem" }}>
          Task Details ({!isOnEditState && "Viewing Mode"}
          {isOnEditState && "Edit Mode"})
        </Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={onHide}
        ></button>
      </Modal.Header>
      {!isOnEditState && (
        <>
          <Modal.Body>
            <div>
              <div></div>
              <div style={{ fontSize: "1.3rem", overflowWrap: "break-word" }}>
                <b>Title:</b> {task.title}
              </div>
              <hr className="my-2" />
              <DescriptionPopover
                title="Show Task Description"
                description={processDescription(task.description)}
              />
              <div className={`${getTaskUnderlineColor()} mb-1`}>
                <b>Priority:</b> {processPriority(task.priority)}
              </div>
              <div className="mb-1">
                <b>Status:</b> {processTaskStatus(task.isDone)}
              </div>
              <div className="mb-1">
                <b>Deadline:</b> {processDeadline(task.deadline)}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {!isOnDeleteState && (
              <>
                <Button variant="gray" onClick={setToDeleteMode}>
                  Delete
                </Button>
                <Button variant="warning" onClick={setToEditMode}>
                  Edit
                </Button>
              </>
            )}
            {isOnDeleteState && (
              <>
              <h6 className="mx-3">Delete this task?</h6>
                <Button variant="gray" onClick={cancelDeleteMode}>
                  Cancel
                </Button>
                <Button variant="danger">
                  Delete
                </Button>
              </>
            )}
          </Modal.Footer>
        </>
      )}
      {isOnEditState && (
        <EditTaskDiv
          task={task}
          onEditTaskButtonClick={editTaskHandler}
          onCancelEditButtonClick={setToViewMode}
        />
      )}
    </Modal>
  );
}

export default TaskViewModal;
