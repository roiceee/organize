import { useCallback } from "react";
import Alert from "react-bootstrap/Alert";
import TaskInterface from "../../interfaces/task-interface";
import styles from "../../styles/modules/transitions.module.scss"

interface DeletedTaskAlertProps {
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
}: DeletedTaskAlertProps) {
  const undoButtonHandler = useCallback(() => {
    onUndoButtonClick(task);
    onHide();
  }, [onUndoButtonClick, task, onHide]);

  return (
    <>
      {show && (
        <Alert
          variant="light"
          onClose={onHide}
          style={{
            position: "fixed",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            maxWidth: "400px",
          }}
          className={`p-2 ${styles.fadeInFaster}`}
        >
          <div className="mx-3 d-flex justify-content-between">
            <div>
              {" "}
              Task &quot;
              {task.title.length > 8 ? task.title.substring(0, 8) : task.title}
              &quot; deleted.{" "}
              <span onClick={undoButtonHandler} className="text-secondary">
                Undo
              </span>
            </div>
            <div>
              <button className="btn-close" onClick={onHide}></button>
            </div>
          </div>
        </Alert>
      )}
    </>
  );
}

export default UndoDeletedTaskAlert;
