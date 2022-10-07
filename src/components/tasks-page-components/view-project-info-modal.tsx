import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProjectControl from "./project-control";

import { useContext } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import ProjectContext from "../../contexts/project-context";
import dateFormatter from "../../utils/dateFormatter";
import { processDescription } from "../../utils/task-utils";

interface ViewProjectInfoModalProps {
  show: boolean;
  onHide: () => void;
  onEditProjectButtonClick: () => void;
  onClearProjectButtonClick: () => void;
  onDeleteProjectButtonClick: () => void;
}

function ViewProjectInfoModal({
  show,
  onHide,
  onEditProjectButtonClick,
  onClearProjectButtonClick,
  onDeleteProjectButtonClick,
}: ViewProjectInfoModalProps) {
  const { currentProjectState, setCurrentProjectState } =
    useContext(ProjectContext);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-primary text-white">
        <Modal.Title id="contained-modal-title-vcenter">
          Project Info
        </Modal.Title>
        <CloseButton onClick={onHide} variant="white" />
      </Modal.Header>

      <>
        <Modal.Body>
          <div className="d-flex justify-content-between px-1">
            <div
              className="w-75 bg-light"
              style={{
                overflowWrap: "break-word",
                overflowY: "scroll",
                maxHeight: "200px",
                fontSize: "0.9rem",
              }}
            >
              <div className="d-flex flex-wrap gap-1">
                <div><b>Date Created:</b></div>
                <div>{dateFormatter(currentProjectState.dateCreated)}</div>
              </div>
              <div className="d-flex flex-wrap gap-1">
                <div><b>Last Modified:</b></div>
                <div>{dateFormatter(currentProjectState.lastModified)}</div>
              </div>
              <div className="mt-1">
                <b>Description:</b> {processDescription(currentProjectState)}
              </div>
            </div>

            <div className="px-1 mx-auto my-auto">
              <ProjectControl
                onEditProjectButtonClick={onEditProjectButtonClick}
                onClearProjectButtonClick={onClearProjectButtonClick}
                onDeleteProjectButtonClick={onDeleteProjectButtonClick}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </>
    </Modal>
  );
}

export default ViewProjectInfoModal;
