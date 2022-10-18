import { useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ClearTasksModalProps {
  show: boolean;
  onHide: () => void;

  clearAllTasksHandler: () => void;
}

function ClearTasksModal({
  show,
  onHide,
  clearAllTasksHandler,
}: ClearTasksModalProps) {
  const clearTasksButtonHandler = useCallback(() => {
    clearAllTasksHandler();
    onHide();
  }, [clearAllTasksHandler, onHide]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="clear-tasks-modal"
      centered
      animation={false}
    >
      <Modal.Header className="bg-warning" closeButton>
        <Modal.Title id="clear-tasks-modal">Clear Tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Are you sure you want to clear all tasks in this project?</div>
        {/* <DeleteConfirmationForm
          keyword="CLEAR"
          keywordIsConfirmedHandler={enableConfirmButton}
          keywordIsNotConfirmedHandler={disableConfirmButton}
        /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="gray" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="action" onClick={clearTasksButtonHandler}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClearTasksModal;
