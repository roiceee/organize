import Alert from "react-bootstrap/Alert";
import TaskInterface from "../../interfaces/task-interface";

interface DeletedTaskAlertProps {
  task: TaskInterface;
  onUndoButtonClick: () => void;
}

function DeletedTaskAlert({ task, onUndoButtonClick }: DeletedTaskAlertProps) {
  return (
    <>
        <Alert
          variant="light"
          className="position-fixed translate-middle-x bottom-50"
          dismissible
        >
          <div className="d-flex gap-2">
            <div>Task &quot;{task.title}&quot; deleted.</div>
            <div onClick={onUndoButtonClick} className="text-secondary">
              Undo
            </div>
          </div>
        </Alert>
      
    </>
  );
}

export default DeletedTaskAlert;
