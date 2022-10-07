import React, { useCallback, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import createTaskObject from "../../defaults/default-task";
import TaskInterface from "../../interfaces/task-interface";
import generateUniqueID from "../../utils/unique-id";
import { validateRequiredInput } from "../../utils/validation";
import ModalWrapper from "../util-components/modal-wrapper";
import TaskForm from "./task-form";

interface AddTaskModalProps {
  showState: boolean;
  onHide: () => void;
  onAddTaskButtonClick: (newTask: TaskInterface) => void;
}

function AddTaskModal({
  showState,
  onHide,
  onAddTaskButtonClick,
}: AddTaskModalProps) {
  const [currentTaskState, setCurrentTaskState] = useState<TaskInterface>(
    createTaskObject()
  );
  const taskTitleFormRef = useRef(null);

  const areFormsValid = useCallback((): boolean => {
    return validateRequiredInput(taskTitleFormRef, "task-title-error");
  }, [taskTitleFormRef]);

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

  const createNewTask = useCallback((): TaskInterface => {
    const currentTaskCopy = { ...currentTaskState };
    const newTask : TaskInterface = {
      ...currentTaskCopy,
      dateCreated: new Date().toString(),
      id: generateUniqueID(),
    };
    return newTask;
  }, [currentTaskState]);

  const resetTaskValues = useCallback(() => {
    setCurrentTaskState(createTaskObject());
  }, []);

  const addTaskButtonHandler = useCallback(() => {
    if (!areFormsValid()) {
      return;
    }
    const newTask = createNewTask();
    onAddTaskButtonClick(newTask);
    resetTaskValues();
  }, [onAddTaskButtonClick, resetTaskValues, areFormsValid, createNewTask]);

  return (
    <ModalWrapper
      modalTitle="Add Task"
      showState={showState}
      onHide={onHide}
      bodyChildren={
        <TaskForm
          formTaskState={currentTaskState}
          taskTitleFormRef={taskTitleFormRef}
          titleFormHandler={taskTitleFormHandler}
          descriptionFormHandler={taskDescriptionFormHandler}
          deadlineFormHandler={deadLineFormHandler}
          priorityFormHandler={priorityFormHandler}
        />
      }
      footerChildren={
        <Button variant="action" onClick={addTaskButtonHandler}>
          Confirm
        </Button>
      }
    />
  );
}

export default AddTaskModal;
