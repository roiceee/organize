import React from "react";
import Modal from "react-bootstrap/Modal";

interface ModalWrapperInterface {
    modalTitle : string;
    bodyChildren : JSX.Element | Array<JSX.Element>;
    footerChildren : JSX.Element | Array <JSX.Element>;
    show : boolean;
    setModalShow : React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalWrapper({modalTitle, bodyChildren, footerChildren, show, setModalShow} : ModalWrapperInterface) {           
    return ( 
        <Modal
      show={show}
      onHide={() => setModalShow(false)}
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
          onClick={() => setModalShow(false)}
        ></button>
      </Modal.Header>
      <Modal.Body>
        {bodyChildren}
      </Modal.Body>
      <Modal.Footer>
        {footerChildren}
      </Modal.Footer>
    </Modal>
     );
}

export default ModalWrapper;            