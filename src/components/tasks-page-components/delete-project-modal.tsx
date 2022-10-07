import { useCallback, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProjectContext from "../../contexts/project-context";
import ProjectInterface from "../../interfaces/project-interface";

interface DeleteProjectModalProps {
  show: boolean;
  onHide: () => void;
  onDeleteProjectButtonClick: (projectToBeDeleted: ProjectInterface) => void;
}

function DeleteProjectModal({
  show,
  onHide,
  onDeleteProjectButtonClick,
}: DeleteProjectModalProps) {
  const { currentProjectState } = useContext(ProjectContext);

  const deleteProjectButtonHandler = useCallback(() => {
    onDeleteProjectButtonClick(currentProjectState);
  }, [onDeleteProjectButtonClick, currentProjectState]);
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="delete-project-modal"
      centered
      animation={false}
    >
      <Modal.Header className="bg-danger" closeButton>
        <Modal.Title id="delete-project-modal">Delete Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
      <Modal.Footer>
        <Button variant="gray" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="action" onClick={deleteProjectButtonHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteProjectModal;
