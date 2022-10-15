import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useCallback, useState } from "react";


interface ClearTasksModalProps {
  show: boolean;
  onHide: () => void;
  onClearButtonClick: () => void;
}

function ClearTasksModal({
  show,
  onHide,
  onClearButtonClick,
}: ClearTasksModalProps) {

  // const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  // const disableConfirmButton = useCallback(() => {
  //   setIsButtonEnabled(false);
  // }, []);

  // const enableConfirmButton = useCallback(() => {
  //   setIsButtonEnabled(true);
  // }, []);

  const clearTasksButtonHandler = useCallback(() => {
    onClearButtonClick();
    onHide();
  }, [onClearButtonClick, onHide]);

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
        <Button variant="action" onClick={clearTasksButtonHandler} >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClearTasksModal;
