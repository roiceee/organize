import Calendar from "react-calendar";
function TaskCalendar() {
  return (
    <div className="mx-auto my-3 d-flex flex-column justify-content-center align-items-center">
      <div>
        <div className="align-self-start">Task Calendar</div>
        <Calendar />
      </div>
    </div>
  );
}

export default TaskCalendar;
