import ProjectModal from "../projects-components/project-modal";
import ProjectArrayInterface from "../../interfaces/project-array-interface";
import ProjectInterface from "../../interfaces/project-interface";
interface EditProjectModalProps {
  showState: boolean;
  onHide: () => void;
  onEditProjectButtonClick: (newProject: ProjectInterface) => void;
}

function EditProjectModal({
  showState,
  onHide,
  onEditProjectButtonClick,
}: EditProjectModalProps) {
  const MODE = "edit";

  return (
    <ProjectModal
      showState={showState}
      onHide={onHide}
      onActionButtonClick={onEditProjectButtonClick}
      modalTitle={"Edit Project"}
      mode={MODE}
    />
  );
}

export default EditProjectModal;
