import { createContext } from "react";
import TaskCalendarToggleContextInterface from "./task-calendar-toggle-context-interface";

const TaskCalendarToggleContext =
  createContext<TaskCalendarToggleContextInterface>({
    showCalendarState: false,
    setShowCalendarState: () => {},
  });

export default TaskCalendarToggleContext;
