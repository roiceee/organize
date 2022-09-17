import React from "react";
import ProjectInterface from "../../interfaces/project-interface";
import ProjectModal from "./project-modal";

interface AddProjectModalProps {
  showState: boolean;
  onHide: () => void;
  onAddProjectButtonClick: (newProject: ProjectInterface) => void;
}

function AddProjectModal({
  showState,
  onHide,
  onAddProjectButtonClick,
}: AddProjectModalProps) {
  const MODE = "add";
  return (
    <ProjectModal
      showState={showState}
      onHide={onHide}
      onActionButtonClick={onAddProjectButtonClick}
      modalTitle={"Add Project"}
      mode={MODE}
    />
  );
}

export default AddProjectModal;
