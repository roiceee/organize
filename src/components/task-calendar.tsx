import { useState, useCallback, useContext, useMemo } from "react";
import Calendar from "react-calendar";
import ProjectArrayContext from "../contexts/project-array-context";
import TaskCalendarModal from "./util-components/task-calendar-modal";
import Accordion from "react-bootstrap/Accordion";

function TaskCalendar() {
  const { projectArrayState } = useContext(ProjectArrayContext);
  const [clickedDateState, setClickedDateState] = useState<Date>(new Date());
  const [showModalState, setShowModalState] = useState<boolean>(false);

  const daysWithTasks = useMemo(() => {
    const days = new Array();
    projectArrayState.projects.forEach((project) => {
      project.tasks.map((task) => {
        if (task.deadline === "") {
          return;
        }
        days.push(new Date(task.deadline));
      });
    });
    return days;
  }, [projectArrayState.projects]);


  const showTaskCalendarModal = useCallback(() => {
    setShowModalState(true);
  }, []);

  const hideTaskCalendarModal = useCallback(() => {
    setShowModalState(false);
  }, []);

  const calendarDayClickHandler = useCallback(
    (date: Date) => {
      setClickedDateState(date);
      showTaskCalendarModal();
    },
    [showTaskCalendarModal]
  );

  return (
    <>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Show Task Calendar</Accordion.Header>
          <Accordion.Body>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Calendar
                tileClassName={({ date }) => {
                  return daysWithTasks.map((day) => {
                    return day.toDateString() === date.toDateString()
                      ? "text-danger fw-bold"
                      : "";
                  });
                }}
                onClickDay={(value) => {
                  calendarDayClickHandler(value);
                }}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <TaskCalendarModal
        show={showModalState}
        onHide={hideTaskCalendarModal}
        date={clickedDateState}
      />
    </>
  );
}

export default TaskCalendar;
