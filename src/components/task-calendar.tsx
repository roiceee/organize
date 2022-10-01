import { useState, useCallback, useContext, useMemo } from "react";
import Calendar from "react-calendar";
import ProjectArrayContext from "../contexts/project-array-context";
import TaskCalendarModal from "./util-components/task-calendar-modal";
import Accordion from "react-bootstrap/Accordion";
import TaskCalendarToggleContext from "../contexts/task-calendar-toggle-context";

function TaskCalendar() {
  const { projectArrayState } = useContext(ProjectArrayContext);
  const { showCalendarState, setShowCalendarState } = useContext(
    TaskCalendarToggleContext
  );
  const [clickedDateState, setClickedDateState] = useState<Date>(new Date());
  const [showModalState, setShowModalState] = useState<boolean>(false);

  const daysWithTasks = useMemo(() => {
    const days = new Array();
    projectArrayState.projects.forEach((project) => {
      project.tasks.map((task) => {
        if (task.deadline === "" || task.isDone) {
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

  const taskCalendarAccordionToggleHandler = useCallback(() => {
    if (!showCalendarState) {
      setShowCalendarState(true);
      return;
    }
    setShowCalendarState(false);
  }, [setShowCalendarState, showCalendarState])

  const calendarDayClickHandler = useCallback(
    (date: Date) => {
      setClickedDateState(date);
      showTaskCalendarModal();
    },
    [showTaskCalendarModal]
  );

  return (
    <>
      <Accordion defaultActiveKey={showCalendarState ? "1" : ""}>
        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={taskCalendarAccordionToggleHandler}>Show Task Calendar</Accordion.Header>
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
