import { useState } from "react";
import Button from "react-bootstrap/Button";
import ProjectInterface from "../../interfaces/project-interface";
import ModalWrapper from "../util-components/modal-wrapper";
import formatDate from "../../utils/dateFormatter";

interface ProjectDescriptionModalProps {
  showState: boolean;
  onHide: () => void;
  project: ProjectInterface;
}
function ProjectDescriptionModal({
  project,
  showState,
  onHide,
}: ProjectDescriptionModalProps) {
  return (
    <ModalWrapper
      modalTitle="Project Description"
      bodyChildren={
        <div>
          <div>Date Created: {formatDate(project.dateCreated)}</div>
          <p>Tasks: {project.tasks.length}</p>
          <p>
            {project.description.trim() === ""
              ? "No Description for this project."
              : `Description: ${project.description}`}
          </p>
        </div>
      }
      footerChildren={<Button onClick={onHide}>Close</Button>}
      showState={showState}
      onHide={onHide}
    />
  );
}

export default ProjectDescriptionModal;
