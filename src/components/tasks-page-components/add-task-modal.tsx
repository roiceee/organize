import React, { useCallback, useState, useRef, useContext } from "react";
import ModalWrapper from "../util-components/modal-wrapper";
import Button from "react-bootstrap/Button";
import TaskInterface from "../../interfaces/task-interface";
import createTaskObject from "../../defaults/default-task";
import {
  validateExistingTask,
  validateRequiredInput,
} from "../../utils/validation";
import ProjectContext from "../../contexts/project-context";
import TaskForm from "./task-form";
import generateUniqueID from "../../utils/unique-id";

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

  const { currentProjectState } = useContext(ProjectContext);
  const taskTitleFormRef = useRef(null);

  const areFormsValid = useCallback((): boolean => {
    return (
      validateRequiredInput(taskTitleFormRef, "task-title-error") &&
      validateExistingTask(
        taskTitleFormRef,
        "task-title-error",
        currentProjectState
      )
    );
  }, [taskTitleFormRef, currentProjectState]);

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
    const newTask = {
      ...currentTaskCopy,
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
