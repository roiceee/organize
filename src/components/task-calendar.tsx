import { useState, useCallback } from "react";
import Calendar from "react-calendar";
function TaskCalendar() {
  const [show, setShow] = useState<boolean>(true);

  const showTaskCalendar = useCallback(() => {
    setShow(true);
  }, []);

  const hideTaskCalendar = useCallback(() => {
    setShow(false);
  }, []);

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
            <Calendar />
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCalendar;
