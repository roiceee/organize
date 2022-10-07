import { useCallback, useState } from "react";
import ProjectInterface from "../../interfaces/project-interface";
import DeleteProjectModal from "./delete-project-modal";
import EditProjectModal from "./edit-project-modal";
import ViewProjectInfoModal from "./view-project-info-modal";
enum ProjectControlModes {
  View,
  Edit,
  Delete,
  Clear,
}

interface ProjectInfoModalProps {
  show: boolean;
  onHide: () => void;
  editProjectHandler: (updatedProject: ProjectInterface) => void;
  deleteProjectHandler: (projectToBeDeleted: ProjectInterface) => void;
  clearProjectHandler: () => void;
}

function ProjectInfoModal({
  show,
  onHide,
  editProjectHandler,
  deleteProjectHandler,
  clearProjectHandler,
}: ProjectInfoModalProps) {
  const [projectModeState, setProjectControlModeState] =
    useState<ProjectControlModes>(ProjectControlModes.View);

  const setToEditMode = useCallback(() => {
    setProjectControlModeState(ProjectControlModes.Edit);
  }, []);

  const setToDeleteMode = useCallback(() => {
    setProjectControlModeState(ProjectControlModes.Delete);
  }, []);

  const setToClearMode = useCallback(() => {
    setProjectControlModeState(ProjectControlModes.Clear);
  }, []);

  const setToViewMode = useCallback(() => {
    setProjectControlModeState(ProjectControlModes.View);
  }, []);

  const modalHideHandler = useCallback(() => {
    onHide();
    setTimeout(() => {
      setToViewMode();
    }, 500);
  }, [setToViewMode, onHide]);

  return (
    <>
      {projectModeState === ProjectControlModes.View && (
        <ViewProjectInfoModal
          show={show}
          onHide={modalHideHandler}
          onEditProjectButtonClick={setToEditMode}
          onClearProjectButtonClick={setToClearMode}
          onDeleteProjectButtonClick={setToDeleteMode}
        />
      )}
      {projectModeState === ProjectControlModes.Edit && (
        <EditProjectModal
          show={show}
          onHide={modalHideHandler}
          onEditButtonClick={editProjectHandler}
        />
      )}
      {projectModeState === ProjectControlModes.Delete && (
        <DeleteProjectModal
          show={show}
          onHide={modalHideHandler}
          onDeleteProjectButtonClick={deleteProjectHandler}
        />
      )}
    </>
  );
}

export default ProjectInfoModal;
