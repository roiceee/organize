import ProjectArrayContextInterface from "../interfaces/project-array-context-interface";
import ProjectInterface from "../interfaces/project-interface";

const defaultProjectArrayContextValue : ProjectArrayContextInterface = {
    projectArrayState: {
        projects: new Array<ProjectInterface>()
    },
    setProjectArrayState: () => {},
}

export default defaultProjectArrayContextValue;