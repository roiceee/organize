import { useCallback, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TaskInterface from "../../interfaces/task-interface";
import { validateRequiredInput } from "../../utils/validation";
import TaskForm from "./task-form";

interface EditTaskDivProps {
  task: TaskInterface;
  onEditTaskButtonClick: (updatedTask: TaskInterface) => void;
  onCancelEditButtonClick: () => void;
}

function EditTaskDiv({
  task,
  onEditTaskButtonClick,
  onCancelEditButtonClick,
}: EditTaskDivProps) {
  const taskTitleFormRef = useRef(null);

  const areFormsValid = useCallback((): boolean => {
    return validateRequiredInput(taskTitleFormRef, "task-title-error");
  }, [taskTitleFormRef]);

  const [taskFormState, setTaskFormState] = useState<TaskInterface>(task);

  const taskTitleFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskFormState((prevTaskFormState) => ({
        ...prevTaskFormState,
        title: e.target.value,
      }));
    },
    [setTaskFormState]
  );

  // const taskDescriptionFormHandler = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setTaskFormState((prevTaskFormState) => ({
  //       ...prevTaskFormState,
  //       description: e.target.value,
  //     }));
  //   },
  //   [setTaskFormState]
  // );

  const dateFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskFormState((prevTaskState) => ({
        ...prevTaskState,
        date: e.target.value,
        deadline: (e.target.value + " " + prevTaskState.time).trim(),
      }));
    },
    []
  );

  const timeFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskFormState((prevTaskState) => ({
        ...prevTaskState,
        time: e.target.value,
        deadline: (prevTaskState.date + " " + e.target.value).trim(),
      }));
    },
    []
  );

  const clearTimeForm = useCallback(() => {
    setTaskFormState((prevTaskState) => ({
      ...prevTaskState,
      time: "",
    }));
  }, []);


  const priorityFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTaskFormState((prevTaskFormState) => ({
        ...prevTaskFormState,
        priority: e.target.value,
      }));
    },
    [setTaskFormState]
  );

  const editTaskButtonHandler = useCallback(() => {
    if (!areFormsValid()) {
      return;
    }
    
    onEditTaskButtonClick(taskFormState);
    onCancelEditButtonClick();
  }, [
    taskFormState,
    onEditTaskButtonClick,
    areFormsValid,
    onCancelEditButtonClick,
  ]);

  return (
    <>
      <Modal.Body>
        <TaskForm
          formTaskState={taskFormState}
          taskTitleFormRef={taskTitleFormRef}
          titleFormHandler={taskTitleFormHandler}
          // descriptionFormHandler={taskDescriptionFormHandler}
          dateFormHandler={dateFormHandler}
          timeFormHandler={timeFormHandler}
          clearTimeForm={clearTimeForm}
          priorityFormHandler={priorityFormHandler}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="gray" onClick={onCancelEditButtonClick}>
          Cancel
        </Button>
        <Button variant="action" onClick={editTaskButtonHandler}>
          Confirm
        </Button>
      </Modal.Footer>
    </>
  );
}

export default EditTaskDiv;
