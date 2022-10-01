import { useContext, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import ProjectArrayContext from "../../contexts/project-array-context";
import formatDate from "../../utils/dateFormatter";
import TaskCalendarCard from "./task-calendar-card";

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
          tasks.push(<TaskCalendarCard key={task.id} projectID={project.id} task={task} />);
        }
      });
    });
    return tasks;
  }, [date, projectArrayState.projects]);

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "1.1rem" }}>
            <>Tasks due on {formatDate(date)}</>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>{tasksDueOnSelectedDate}</>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TaskCalendarModal;
