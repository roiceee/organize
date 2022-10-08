import { useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmationForm from "../util-components/delete-confirmation-form";
import Button from "react-bootstrap/Button";

interface ClearDataModalProps {
  show: boolean;
  onHide: () => void;
  clearDataHandler: () => void;
}

function ClearDataModal({
  show,
  onHide,
  clearDataHandler,
}: ClearDataModalProps) {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const disableConfirmButton = useCallback(() => {
    setIsButtonEnabled(false);
  }, []);

  const enableConfirmButton = useCallback(() => {
    setIsButtonEnabled(true);
  }, []);

  const onConfirmButtonClick = useCallback(() => {
    clearDataHandler();
    onHide();
  }, [onHide, clearDataHandler]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="clear-data-modal"
      centered
      animation={false}
    >
      <Modal.Header className="bg-danger" closeButton>
        <Modal.Title id="clear-data-modal">Clear Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Are you sure you want to clear all data? This can&apos;t be undone.
        </div>
        <DeleteConfirmationForm
          keyword="CLEAR DATA"
          keywordIsConfirmedHandler={enableConfirmButton}
          keywordIsNotConfirmedHandler={disableConfirmButton}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="gray" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="action"
          onClick={onConfirmButtonClick}
          disabled={!isButtonEnabled}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClearDataModal;
