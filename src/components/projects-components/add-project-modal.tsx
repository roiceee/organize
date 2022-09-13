import React from "react";
import ProjectInterface from "../../interfaces/project-interface";
import ProjectArrayInterface from "../../interfaces/project-array-interface";
import ProjectModal from "./project-modal";

interface AddProjectModalProps {
  projectObject: ProjectInterface;
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
  projectObject,
}: AddProjectModalProps) {
  const MODE = "add";
  return (
    <ProjectModal
      projectObject={projectObject}
      showState={showState}
      onHide={onHide}
      projectArrayState={projectArrayState}
      onActionButtonClick={onAddProjectButtonClick}
      modalTitle={"Add Project"}
      mode={MODE}
    />
  );
}

export default AddProjectModal;
