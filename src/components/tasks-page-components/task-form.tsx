import Form from "react-bootstrap/Form";
import TaskConstraintsEnum from "../../enums/task-constraints";
import TaskInterface from "../../interfaces/task-interface";
import FormLengthCounter from "../util-components/form-length-counter";
import { removeErrorFields } from "../../utils/validation";
import { useCallback, useEffect } from "react";

interface TaskFormProps {
  formTaskState: TaskInterface;
  taskTitleFormRef: React.RefObject<HTMLInputElement>;
  titleFormHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  descriptionFormHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deadlineFormHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priorityFormHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TaskForm({
  formTaskState,
  taskTitleFormRef,
  titleFormHandler,
  descriptionFormHandler,
  deadlineFormHandler,
  priorityFormHandler,
}: TaskFormProps) {
  const titleOnFocusHandler = useCallback(() => {
    removeErrorFields(taskTitleFormRef, "task-title-error");
  }, [taskTitleFormRef]);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <div className="d-flex justify-content-between mb-1">
        <div>Title (required)</div>
        <FormLengthCounter
          currentValue={formTaskState.title.length}
          maxValue={TaskConstraintsEnum.TitleLength}
        />
      </div>
      <Form.Control
        autoFocus
        type="text"
        placeholder="Task title"
        maxLength={TaskConstraintsEnum.TitleLength}
        value={formTaskState.title}
        onChange={titleFormHandler}
        onFocus={titleOnFocusHandler}
        ref={taskTitleFormRef}
      />
      <div className="error my-1" id="task-title-error"></div>
      <div className="d-flex justify-content-between mb-1">
        <div>Description</div>
        <FormLengthCounter
          currentValue={formTaskState.description.length}
          maxValue={TaskConstraintsEnum.DescriptionLength}
        />
      </div>
      <Form.Control
        as="textarea"
        placeholder="Task Description"
        className="mb-2"
        style={{ height: "90px" }}
        maxLength={TaskConstraintsEnum.DescriptionLength}
        value={formTaskState.description}
        onChange={descriptionFormHandler}
      />
      <div className="d-flex gap-2 align-items-center">
        <div>Deadline:</div>
        <Form.Control
          type="date"
          style={{ width: "fit-content" }}
          className="mb-2"
          value={formTaskState.deadline}
          onChange={deadlineFormHandler}
        />
      </div>
      <div className="d-flex gap-2">
        <div>Priority: </div>
        <div key={`inline-radio`} className="mb-2 gap-1">
        <Form.Check
            inline
            label="None"
            name="priority"
            type="radio"
            value=""
            onChange={priorityFormHandler}
            checked={"" === formTaskState.priority}
          />
          <Form.Check
            inline
            label="Low"
            name="priority"
            type="radio"
            value="low"
            onChange={priorityFormHandler}
            checked={"low" === formTaskState.priority}
          />
          <Form.Check
            inline
            label="Medium"
            name="priority"
            type="radio"
            value="medium"
            onChange={priorityFormHandler}
            checked={"medium" === formTaskState.priority}
          />
          <Form.Check
            inline
            label="High"
            name="priority"
            type="radio"
            value="high"
            onChange={priorityFormHandler}
            className="check"
            checked={"high" === formTaskState.priority}
          />
        </div>
      </div>
    </Form>
  );
}

export default TaskForm;
