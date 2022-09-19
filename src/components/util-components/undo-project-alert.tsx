import ProjectInterface from "../../interfaces/project-interface";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/modules/transitions.module.scss";
import { useCallback, useEffect } from "react";
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


  useEffect(() => {
    setTimeout(() => {
        onHide();
    }, 10000)
  }, [onHide])
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
              Project &quot;
              {project.title.length > 8
                ? project.title.substring(0, 8)
                : project.title}
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

export default UndoProjectAlert;
