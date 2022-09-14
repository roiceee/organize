import { ProjectContextInterface } from "../contexts/project-context";
import createProjectObject from "./default-project";

const defaultProjectContextValue: ProjectContextInterface = {
  projectState: createProjectObject(),
  setProjectState: () => {},
};

export default defaultProjectContextValue;
