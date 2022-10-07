import ProjectArrayInterface from "../interfaces/project-array-interface";
import ProjectInterface from "../interfaces/project-interface";

function createProjectArrayObject(): ProjectArrayInterface {
  return {
    projects: new Array<ProjectInterface>(),
    recentlyDeletedProject: null,
  };
}

export default createProjectArrayObject;
