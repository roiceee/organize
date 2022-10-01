import { useContext, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import ProjectArrayContext from "../../contexts/project-array-context";
import formatDate from "../../utils/dateFormatter";
import TaskCalendarCard from "./task-calendar-card";
import CloseButton from "react-bootstrap/CloseButton";

interface TaskCalendarModalProps {
  show: boolean;
  onHide: () => void;
  date: Date;
}
function TaskCalendarModal({ show, onHide, date }: TaskCalendarModalProps) {
  const { projectArrayState } = useContext(ProjectArrayContext);

  const tasksDueOnSelectedDate = useMemo(() => {
    const tasks: Array<JSX.Element> = new Array();
    projectArrayState.projects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (new Date(task.deadline).toDateString() === date.toDateString()) {
          if (task.isDone) {
            return;
          }
          tasks.push(
            <TaskCalendarCard
              key={task.id}
              projectID={project.id}
              task={task}
              closeModal={onHide}
            />
          );
        }
      });
    });
    return tasks;
  }, [date, projectArrayState.projects, onHide]);

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={onHide}
        centered
      >
        <Modal.Header className="bg-primary text-light">
          <Modal.Title style={{ fontSize: "1.1rem" }}>
            <>Tasks due on {formatDate(date)}</>
          </Modal.Title>
          <CloseButton variant="white" onClick={onHide} />
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "280px", overflowY: "scroll" }}>
          <>{tasksDueOnSelectedDate.length === 0 && <div>None</div>}</>
          <>{tasksDueOnSelectedDate}</>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TaskCalendarModal;
