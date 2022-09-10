import ProjectInterface from "../interfaces/project-interface";
import TaskInterface from "../interfaces/task-interface";

function createProjectObject() : ProjectInterface {
    return {
        id: "",
        title: "",
        description: "",
        dateCreated: "",
        lastModified: "",
        tasks: new Array<TaskInterface>(),
    }
}

export default createProjectObject;