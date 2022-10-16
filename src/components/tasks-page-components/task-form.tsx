import { useCallback, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import TaskConstraintsEnum from "../../enums/task-constraints";
import TaskInterface from "../../interfaces/task-interface";
import { removeErrorFields } from "../../utils/validation";
import FormLengthCounter from "../util-components/form-length-counter";

interface TaskFormProps {
  formTaskState: TaskInterface;
  taskTitleFormRef: React.RefObject<HTMLInputElement>;
  titleFormHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // descriptionFormHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  timeFormHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateFormHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priorityFormHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearTimeForm: () => void;
}

function TaskForm({
  formTaskState,
  taskTitleFormRef,
  titleFormHandler,
  // descriptionFormHandler,
  timeFormHandler,
  clearTimeForm,
  dateFormHandler,
  priorityFormHandler,
}: TaskFormProps) {
  const titleOnFocusHandler = useCallback(() => {
    removeErrorFields(taskTitleFormRef, "task-title-error");
  }, [taskTitleFormRef]);
  const [hasDate, setHasDate] = useState<boolean>(false);
  

  useEffect(() => {
    if (formTaskState.date === "" || !formTaskState.date) {
      clearTimeForm();
      setHasDate(false);
      return;
    }
    setHasDate(true);
  }, [setHasDate, formTaskState.date, clearTimeForm]);

  return (
    <Form onSubmit={(e) => e.preventDefault()} style={{ fontSize: "0.9rem" }}>
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
      <Form.Group>
        <Form.Label className="mb-0">Date:</Form.Label>
        <Form.Control
          type="date"
          style={{ width: "fit-content" }}
          className="mb-2"
          value={formTaskState.date}
          onChange={dateFormHandler}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="mb-0">Time:</Form.Label>
        <Form.Control
          disabled={!hasDate}
          type="time"
          style={{ width: "fit-content" }}
          className="mb-2"
          value={formTaskState.time}
          onChange={timeFormHandler}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="mb-0">Priority:</Form.Label>
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
      </Form.Group>
    </Form>
  );
}

export default TaskForm;

//task description form
{
  /* <div className="d-flex justify-content-between mb-1">
        <div>Description</div>
        <FormLengthCounter
          currentValue={formTaskState.description.length}
          maxValue={TaskConstraintsEnum.DescriptionLength}
        />
      </div> */
}
{
  /* <Form.Control
        as="textarea"
        placeholder="Task Description"
        className="mb-2"
        style={{ height: "90px" }}
        maxLength={TaskConstraintsEnum.DescriptionLength}
        value={formTaskState.description}
        onChange={descriptionFormHandler}
      /> */
}
