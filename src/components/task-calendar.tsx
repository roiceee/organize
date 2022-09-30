import { useState, useCallback, useContext, useMemo } from "react";
import Calendar from "react-calendar";
import ProjectArrayContext from "../contexts/project-array-context";
function TaskCalendar() {
  const { projectArrayState } = useContext(ProjectArrayContext);
  const [show, setShow] = useState<boolean>(true);

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

  const showTaskCalendar = useCallback(() => {
    setShow(true);
  }, []);

  const hideTaskCalendar = useCallback(() => {
    setShow(false);
  }, []);

  console.log(daysWithTasks);
  return (
    <div className="mx-auto my-3">
      {!show && (
        <div style={{ fontSize: "0.8rem" }}>
          <span onClick={showTaskCalendar} className="text-primary">
            Show Task Calendar
          </span>
        </div>
      )}
      {show && (
        <>
          <div
            onClick={hideTaskCalendar}
            style={{ fontSize: "0.8rem" }}
            className="text-primary mb-1"
          >
            Hide Task Calendar
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Calendar
              tileClassName={({ activeStartDate, date, view }) => {
                return daysWithTasks.map((day) => {
                  return day.toDateString() === date.toDateString()
                    ? "text-danger"
                    : "";
                });
              }}
              onClickDay={(value) => {
                console.log("Clicked day: " + new Date(value).toDateString());
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCalendar;
