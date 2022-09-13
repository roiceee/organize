
import React from "react";
import ProjectInterface from "../../interfaces/project-interface";
import ProjectArrayInterface from "../../interfaces/project-array-interface";
import ProjectModal from "./project-modal";

interface AddProjectModalProps {
  showState: boolean;
  onHide: () => void;
  projectArrayState: ProjectArrayInterface;
  onAddProjectButtonClick: (newProject: ProjectInterface) => void;
}

function AddProjectModal({
  showState,
  onHide,
  projectArrayState,
  onAddProjectButtonClick,
}: AddProjectModalProps) {
  return (
    <ProjectModal
      showState={showState}
      onHide={onHide}
      projectArrayState={projectArrayState}
      onActionButtonClick={onAddProjectButtonClick}
    />
  );
}

export default AddProjectModal;
