import ProjectArrayInterface from "./project-array-interface";

interface ProjectArrayContextInterface {
  projectArrayState: ProjectArrayInterface;
  setProjectArrayState: React.Dispatch<
    React.SetStateAction<ProjectArrayInterface>
  >;
}

export default ProjectArrayContextInterface;
