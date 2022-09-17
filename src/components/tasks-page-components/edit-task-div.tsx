import { useState, useCallback, useContext, useRef } from "react";
import ProjectContext from "../../contexts/project-context";
import TaskInterface from "../../interfaces/task-interface";
import TaskForm from "./task-form";
import Modal from "react-bootstrap/Modal"
import {
  validateRequiredInput,
  validateExistingTaskExceptForCurrent,
} from "../../utils/validation";
import Button from "react-bootstrap/Button";

interface EditTaskDivProps {
  task: TaskInterface;
  onEditTaskButtonClick: (updatedTask: TaskInterface) => void;
  onCancelEditButtonClick: () => void;
}

function EditTaskDiv({ task, onEditTaskButtonClick, onCancelEditButtonClick }: EditTaskDivProps) {
  const [currentTaskState, setCurrentTaskState] = useState<TaskInterface>(task);
  const { currentProjectState } = useContext(ProjectContext);
  const taskTitleFormRef = useRef(null);

  const areFormsValid = useCallback((): boolean => {
    return (
      validateRequiredInput(taskTitleFormRef, "task-title-error") &&
      validateExistingTaskExceptForCurrent(
        taskTitleFormRef,
        "task-title-error",
        currentProjectState,
        task
      )
    );
  }, [taskTitleFormRef, currentProjectState, task]);

  const taskTitleFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTaskState((prevTaskState) => ({
        ...prevTaskState,
        title: e.target.value,
      }));
    },
    []
  );

  const taskDescriptionFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTaskState((prevTaskState) => ({
        ...prevTaskState,
        description: e.target.value,
      }));
    },
    []
  );

  const deadLineFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTaskState((prevTaskState) => ({
        ...prevTaskState,
        deadline: e.target.value,
      }));
    },
    []
  );

  const priorityFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTaskState((prevTaskState) => ({
        ...prevTaskState,
        priority: e.target.value,
      }));
    },
    []
  );

  const editTaskButtonHandler = useCallback(() => {
    if (!areFormsValid()) {
      return;
    }
    onEditTaskButtonClick(currentTaskState);
    onCancelEditButtonClick();
  }, [currentTaskState, onEditTaskButtonClick, areFormsValid, onCancelEditButtonClick]);
  
  return (
    <>
    <Modal.Body>
      <TaskForm
        formTaskState={currentTaskState}
        taskTitleFormRef={taskTitleFormRef}
        titleFormHandler={taskTitleFormHandler}
        descriptionFormHandler={taskDescriptionFormHandler}
        deadlineFormHandler={deadLineFormHandler}
        priorityFormHandler={priorityFormHandler}
      />
      </Modal.Body>
      <Modal.Footer>
      <Button variant="gray" onClick={onCancelEditButtonClick}>Cancel</Button>
        <Button variant="action" onClick={editTaskButtonHandler}>Confirm</Button>
      </Modal.Footer>
    </>
  );
}

export default EditTaskDiv;
