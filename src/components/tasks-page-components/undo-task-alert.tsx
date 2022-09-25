import { useCallback } from "react";
import TaskInterface from "../../interfaces/task-interface";
import UndoDeletedAlert from "../util-components/undo-deleted-alert";

interface UndoDeletedTaskAlertProps {
  show: boolean;
  onHide: () => void;
  task: TaskInterface;
  onUndoButtonClick: (deletedTask: TaskInterface) => void;
}

function UndoDeletedTaskAlert({
  show,
  onHide,
  task,
  onUndoButtonClick,
}: UndoDeletedTaskAlertProps) {
  const undoButtonHandler = useCallback(() => {
    onUndoButtonClick(task);
    onHide();
  }, [onUndoButtonClick, task, onHide]);

  return (
    <UndoDeletedAlert
      label="Task"
      show={show}
      onHide={onHide}
      itemName={task.title}
      undoButtonHandler={undoButtonHandler}
    />
  );
}

export default UndoDeletedTaskAlert;
