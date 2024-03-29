import ProjectInterface from "../interfaces/project-interface";
import TaskInterface from "../interfaces/task-interface";

function createProjectObject(): ProjectInterface {
  return {
    type: "project",
    id: "",
    title: "",
    description: "",
    dateCreated: "",
    lastModified: "",
    tasks: new Array<TaskInterface>(),
    recentlyDeletedTask: null,
  };
}

export default createProjectObject;
