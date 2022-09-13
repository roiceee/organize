import Modal from "react-bootstrap/Modal";

interface DescriptionModalProps {
  show: boolean;
  onHide: () => void;
  description: string;
}

function DescriptionModal({
  show,
  onHide,
  description,
}: DescriptionModalProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Project Description
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{overflowWrap: "break-word"}}>{description}</div>
      </Modal.Body>
    </Modal>
  );
}

export default DescriptionModal;
