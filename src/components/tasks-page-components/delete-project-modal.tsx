import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface DeleteProjectModalProps {
  show: boolean;
  onHide: () => void;
  onDeleteProjectButtonClick?: () => void;
}

function DeleteProjectModal({ show, onHide, onDeleteProjectButtonClick }: DeleteProjectModalProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="delete-project-modal"
      centered
    >
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title id="delete-project-modal">Delete Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this project?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="gray" onClick={onHide}>Cancel</Button>
        <Button variant="action" onClick={onDeleteProjectButtonClick}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteProjectModal;
