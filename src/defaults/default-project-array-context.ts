import { ProjectArrayContextInterface } from "../contexts/project-array-context";
import ProjectInterface from "../interfaces/project-interface";

const defaultProjectArrayContextValue : ProjectArrayContextInterface = {
    projectArrayState: {
        projects: new Array<ProjectInterface>()
    },
    setProjectArrayState: () => {},
}

export default defaultProjectArrayContextValue;