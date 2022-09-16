import Modal from "react-bootstrap/Modal";
import TaskInterface from "../../interfaces/task-interface";
import _ from "lodash";
import {
  processDeadline,
  processPriority,
  processTaskStatus,
} from "../../utils/task-utils";

interface TaskViewModalProps {
  task: TaskInterface;
  show: boolean;
  onHide: () => void;
}

function TaskViewModal({ task, show, onHide }: TaskViewModalProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      aria-labelledby="task-view-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="task-view-modal" style={{ fontSize: "1rem" }}>
          Task Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
            <div></div>
          <div style={{ fontSize: "1.3rem", overflowWrap: "break-word" }}>
            <b>Title:</b> {task.title}
          </div>
          <hr className="my-2"></hr>
          <div>Priority: {processPriority(task.priority)}</div>
          <div>Status: {processTaskStatus(task.isDone)}</div>
          <div>Deadline: {processDeadline(task.deadline)}</div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default TaskViewModal;
