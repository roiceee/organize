import ProjectArrayInterface from "../interfaces/project-array-interface";
import ProjectInterface from "../interfaces/project-interface";
import TaskInterface from "../interfaces/task-interface";

function createProjectArrayObject(): ProjectArrayInterface {
  return {
    projects: new Array<ProjectInterface>(),
    recentlyDeletedProject: null,
  };
}

export default createProjectArrayObject;
