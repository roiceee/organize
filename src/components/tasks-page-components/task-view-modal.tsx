import Modal from "react-bootstrap/Modal";
import TaskInterface from "../../interfaces/task-interface";
import _ from "lodash";
import { processDeadline, processPriority, processTaskStatus } from "../../utils/task-utils";

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
      size="sm"
      aria-labelledby="task-view-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="task-view-modal" style={{ fontSize: "1.2rem" }}>
          Task Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{fontSize: "1.3rem"}}>Task Title: {task.title}</div>
        <div>Priority: {processPriority(task.priority)}</div>
        <div>Status: {processTaskStatus(task.isDone)}</div>
        <div>Deadline: {processDeadline(task.deadline)}</div>
      </Modal.Body>
    </Modal>
  );
}

export default TaskViewModal;
