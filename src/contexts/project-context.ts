
import { createContext } from "react";
import defaultProjectContextValue from "../defaults/default-project-context";
import ProjectContextInterface from "../interfaces/project-context-interface";

const ProjectContext = createContext<ProjectContextInterface>(defaultProjectContextValue);

export default ProjectContext;