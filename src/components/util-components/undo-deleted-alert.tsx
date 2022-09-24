import Alert from "react-bootstrap/Alert";
import styles from "../../styles/modules/transitions.module.scss";
interface UndoAlertProps {
  label: string;
  show: boolean;
  onHide: () => void;
  itemName: string;
  undoButtonHandler: () => void;
}

function UndoDeletedAlert({
  label,
  show,
  onHide,
  itemName,
  undoButtonHandler,
}: UndoAlertProps) {
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
          className={`p-2 ${styles.fadeInFaster} shadow`}
        >
          <div className="mx-3 d-flex justify-content-between">
            <div>
              {" "}
              {label} &quot;
              {itemName.length > 8 ? itemName.substring(0, 8) : itemName}
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

export default UndoDeletedAlert;
