import { createContext } from "react";
import defaultProjectArrayContextValue from "../defaults/default-project-array-context";
import ProjectArrayContextInterface from "../interfaces/project-array-context-interface";


const ProjectArrayContext = createContext<ProjectArrayContextInterface>(defaultProjectArrayContextValue);

export default ProjectArrayContext;