import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProjectInterface from "../../interfaces/project-interface";
import { useCallback, useContext } from "react";
import ProjectContext from "../../contexts/project-context";
import Link from "next/link";
import { saveToStorage } from "../../utils/local-storage-util";
import UserTypeContext from "../../contexts/user-context";

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
