import { useCallback } from "react";
import ProjectInterface from "../../interfaces/project-interface";
import UndoDeletedAlert from "./undo-deleted-alert";
interface UndoAlertProps {
  show: boolean;
  onHide: () => void;
  project: ProjectInterface;
  onUndoButtonClick: (deletedProject: ProjectInterface) => void;
}

function UndoProjectAlert({
  show,
  onHide,
  project,
  onUndoButtonClick,
}: UndoAlertProps) {
  const undoButtonHandler = useCallback(() => {
    onUndoButtonClick(project);
    onHide();
  }, [onUndoButtonClick, project, onHide]);

  return (
    <UndoDeletedAlert
      label="Project"
      show={show}
      onHide={onHide}
      itemName={project.title}
      undoButtonHandler={undoButtonHandler}
    />
  );
}

export default UndoProjectAlert;
