import ProjectContextInterface from "../interfaces/project-context-interface";
import createProjectObject from "./default-project";

const defaultProjectContextValue: ProjectContextInterface = {
  currentProjectState: createProjectObject(),
  setCurrentProjectState: () => {},
};

export default defaultProjectContextValue;
