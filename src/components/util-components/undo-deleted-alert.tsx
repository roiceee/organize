import FloatingAlert from "./floating-alert";

//this is a util component used by undo-deleted-project and undo-deleted-task components
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
      <FloatingAlert show={show} onHide={onHide}>
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
      </FloatingAlert>
    </>
  );
}

export default UndoDeletedAlert;
