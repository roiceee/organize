import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import ModalWrapper from "../util-components/modal-wrapper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TaskConstraintsEnum from "../../enums/task-constraints";
import FormLengthCounter from "../util-components/form-length-counter";
import ProjectInterface from "../../interfaces/project-interface";
import TaskInterface from "../../interfaces/task-interface";

interface AddTaskModalInterface {
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentProjectState: React.Dispatch<
    React.SetStateAction<ProjectInterface | undefined>
  >;
}

function AddTaskModal({
  show,
  setModalShow,
  setCurrentProjectState,
}: AddTaskModalInterface) {
  const [currentTaskState, setCurrentTaskState] = useState<TaskInterface>({
    title: "",
    isDone: false,
    deadline: "",
    priority: "",
  });

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
        deadline: new Date(e.target.value),
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

//   const addButtonHandler = useCallback(() => {
//    if ()
//     setCurrentProjectState((prevProjectState) => ({
//       ...prevProjectState,
//       tasks: [...prevProjectState.tasks, currentTaskState],
//     }));
//   }, []);

  useEffect(() => {
    console.log(currentTaskState);
  }, [currentTaskState]);

  return (
    <ModalWrapper
      modalTitle="Add Task"
      show={show}
      setModalShow={setModalShow}
      bodyChildren={
        <Form onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex justify-content-end">
            <FormLengthCounter
              currentValue={currentTaskState.title.length}
              maxValue={TaskConstraintsEnum.TitleLength}
            />
          </div>

          <Form.Control
            type="text"
            placeholder="Task Name"
            className="mb-2"
            maxLength={TaskConstraintsEnum.TitleLength}
            onChange={taskTitleFormHandler}
          />
          <div className="d-flex gap-2 align-items-center">
            <div>Deadline:</div>
            <Form.Control
              type="date"
              style={{ width: "fit-content" }}
              className="mb-2"
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
      footerChildren={<Button variant="secondary">Add Task</Button>}
    />
  );
}

export default AddTaskModal;
