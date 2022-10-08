import { useCallback, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProjectContext from "../../contexts/project-context";
import ProjectInterface from "../../interfaces/project-interface";
import DeleteConfirmationForm from "../util-components/delete-confirmation-form";

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

  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const disableConfirmButton = useCallback(() => {
    setIsButtonEnabled(false);
  }, []);

  const enableConfirmButton = useCallback(() => {
    setIsButtonEnabled(true);
  }, []);

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
      <Modal.Body>
        <div>Are you sure you want to delete this project?</div>
        <DeleteConfirmationForm
          keyword="DELETE"
          keywordIsConfirmedHandler={enableConfirmButton}
          keywordIsNotConfirmedHandler={disableConfirmButton}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="gray" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="action" onClick={deleteProjectButtonHandler} disabled={!isButtonEnabled}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteProjectModal;
