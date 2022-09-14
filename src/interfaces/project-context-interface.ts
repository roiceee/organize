import ProjectInterface from "./project-interface";

interface ProjectContextInterface {
  currentProjectState: ProjectInterface;
  setCurrentProjectState: React.Dispatch<React.SetStateAction<ProjectInterface>>;
}

export default ProjectContextInterface;
