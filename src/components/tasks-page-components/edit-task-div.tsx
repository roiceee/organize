import React, { useState, useCallback, useContext, useRef } from "react";
import ProjectContext from "../../contexts/project-context";
import TaskInterface from "../../interfaces/task-interface";
import TaskForm from "./task-form";
import Modal from "react-bootstrap/Modal";
import {
  validateRequiredInput,
} from "../../utils/validation";
import Button from "react-bootstrap/Button";

interface EditTaskDivProps {
  currentTaskState: TaskInterface;
  setCurrentTaskState: React.Dispatch<React.SetStateAction<TaskInterface>>;
  onEditTaskButtonClick: (updatedTask: TaskInterface) => void;
  onCancelEditButtonClick: () => void;
}

function EditTaskDiv({
  currentTaskState,
  setCurrentTaskState,
  onEditTaskButtonClick,
  onCancelEditButtonClick,
}: EditTaskDivProps) {
  const { currentProjectState } = useContext(ProjectContext);
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
    [setCurrentTaskState]
  );

  const taskDescriptionFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTaskState((prevTaskState) => ({
        ...prevTaskState,
        description: e.target.value,
      }));
    },
    [setCurrentTaskState]
  );

  const deadLineFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTaskState((prevTaskState) => ({
        ...prevTaskState,
        deadline: e.target.value,
      }));
    },
    [setCurrentTaskState]
  );

  const priorityFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTaskState((prevTaskState) => ({
        ...prevTaskState,
        priority: e.target.value,
      }));
    },
    [setCurrentTaskState]
  );

  const editTaskButtonHandler = useCallback(() => {
    if (!areFormsValid()) {
      return;
    }
    onEditTaskButtonClick(currentTaskState);
    onCancelEditButtonClick();
  }, [
    currentTaskState,
    onEditTaskButtonClick,
    areFormsValid,
    onCancelEditButtonClick,
  ]);

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
