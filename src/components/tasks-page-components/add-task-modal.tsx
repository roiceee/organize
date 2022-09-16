import React, { useCallback, useState, useRef, useContext } from "react";
import ModalWrapper from "../util-components/modal-wrapper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TaskConstraintsEnum from "../../enums/task-constraints";
import FormLengthCounter from "../util-components/form-length-counter";
import TaskInterface from "../../interfaces/task-interface";
import createTaskObject from "../../defaults/default-task";
import {
  validateExistingTask,
  validateRequiredInput,
  removeErrorFields,
} from "../../utils/validation";
import ProjectInterface from "../../interfaces/project-interface";
import ProjectContext from "../../contexts/project-context";

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
  const taskTitleForm = useRef(null);

  const areFormsValid = useCallback((): boolean => {
    return (
      validateRequiredInput(taskTitleForm, "task-title-error") &&
      validateExistingTask(
        taskTitleForm,
        "task-title-error",
        currentProjectState
      )
    );
  }, [taskTitleForm, currentProjectState]);

  const titleOnFocusHandler = useCallback(() => {
    removeErrorFields(taskTitleForm, "task-title-error");
  }, [taskTitleForm]);

  const taskTitleFormHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTaskState((prevTaskState) => ({
        ...prevTaskState,
        title: e.target.value,
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

  const resetTaskValues = useCallback(() => {
    setCurrentTaskState(createTaskObject());
  }, []);

  const addTaskButtonHandler = useCallback(() => {
    if (!areFormsValid()) {
      return;
    }
    onAddTaskButtonClick(currentTaskState);
    resetTaskValues();
  }, [currentTaskState, onAddTaskButtonClick, resetTaskValues, areFormsValid]);

  return (
    <ModalWrapper
      modalTitle="Add Task"
      showState={showState}
      onHide={onHide}
      bodyChildren={
        <Form onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex justify-content-between">
            <div>Title</div>
            <FormLengthCounter
              currentValue={currentTaskState.title.length}
              maxValue={TaskConstraintsEnum.TitleLength}
            />
          </div>

          <Form.Control
            autoFocus
            type="text"
            placeholder="Task title"
            maxLength={TaskConstraintsEnum.TitleLength}
            value={currentTaskState.title}
            onChange={taskTitleFormHandler}
            onFocus={titleOnFocusHandler}
            ref={taskTitleForm}
          />
          <div className="error my-1" id="task-title-error"></div>
          <div className="d-flex gap-2 align-items-center">
            <div>Deadline:</div>
            <Form.Control
              type="date"
              style={{ width: "fit-content" }}
              className="mb-2"
              value={currentTaskState.deadline}
              onChange={deadLineFormHandler}
            />
          </div>
          <div className="d-flex gap-2">
            <div>Priority: </div>
            <div key={`inline-radio`} className="mb-2 gap-1">
              <Form.Check
                inline
                label="Low"
                name="priority"
                type="radio"
                value="low"
                onChange={priorityFormHandler}
              />
              <Form.Check
                inline
                label="Medium"
                name="priority"
                type="radio"
                value="medium"
                onChange={priorityFormHandler}
              />
              <Form.Check
                inline
                label="High"
                name="priority"
                type="radio"
                value="high"
                onChange={priorityFormHandler}
              />
            </div>
          </div>
        </Form>
      }
      footerChildren={
        <Button variant="secondary" onClick={addTaskButtonHandler}>
          Add Task
        </Button>
      }
    />
  );
}

export default AddTaskModal;
