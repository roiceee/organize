import ProjectModal from "../projects-components/project-modal";
import ProjectArrayInterface from "../../interfaces/project-array-interface";
import ProjectInterface from "../../interfaces/project-interface";
interface EditProjectModalProps {
  showState: boolean;
  onHide: () => void;
  projectArrayState: ProjectArrayInterface;
  onEditProjectButtonClick: (newProject: ProjectInterface) => void;
  projectObject: ProjectInterface;
}

function EditProjectModal({
  showState,
  onHide,
  projectArrayState,
  onEditProjectButtonClick,
  projectObject
}: EditProjectModalProps) {
  const MODE = "edit";

  return (
    <ProjectModal
      projectObject={projectObject}
      showState={showState}
      onHide={onHide}
      projectArrayState={projectArrayState}
      onActionButtonClick={onEditProjectButtonClick}
      modalTitle={"Edit Project"}
      mode={MODE}
    />
  );
}

export default EditProjectModal;
