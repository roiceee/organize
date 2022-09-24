import ProjectArrayContextInterface from "../interfaces/project-array-context-interface";
import ProjectInterface from "../interfaces/project-interface";
import TaskInterface from "../interfaces/task-interface";

const defaultProjectArrayContextValue: ProjectArrayContextInterface = {
  projectArrayState: {
    projects: new Array<ProjectInterface>(),
    recentlyDeletedProject: null,
  },
  setProjectArrayState: () => {},
};

export default defaultProjectArrayContextValue;
