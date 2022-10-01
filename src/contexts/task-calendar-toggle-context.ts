import { createContext } from "react";
import TaskCalendarToggleContextInterface from "../interfaces/task-calendar-toggle-context-interface";

const TaskCalendarToggleContext =
  createContext<TaskCalendarToggleContextInterface>({
    showCalendarState: false,
    setShowCalendarState: () => {},
  });

export default TaskCalendarToggleContext;
