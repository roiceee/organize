import ProjectArrayInterface from "../interfaces/project-array-interface";
import ProjectInterface from "../interfaces/project-interface";

function createProjectArrayObject() : ProjectArrayInterface {
    return {
        projects: new Array<ProjectInterface>(),
        deletedProjects: new Array<ProjectInterface>()
    }
}

export default createProjectArrayObject;