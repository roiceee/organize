import Modal from "react-bootstrap/Modal";

//this is a util component used by other components that utilizes the same modal structure
interface ModalWrapperProps {
  modalTitle: string;
  bodyChildren: JSX.Element | Array<JSX.Element>;
  footerChildren: JSX.Element | Array<JSX.Element>;
  showState: boolean;
  onHide: () => void;
}

function ModalWrapper({
  modalTitle,
  bodyChildren,
  footerChildren,
  showState,
  onHide,
}: ModalWrapperProps) {
  return (
    <Modal
      show={showState}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-primary text-light">
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={onHide}
        ></button>
      </Modal.Header>
      <Modal.Body>{bodyChildren}</Modal.Body>
      <Modal.Footer>{footerChildren}</Modal.Footer>
    </Modal>
  );
}

export default ModalWrapper;
