import ProjectInterface from "./project-interface"

interface ProjectArrayInterface {
    projects: ProjectInterface[];
    recentlyDeletedProject: ProjectInterface | null;
  }

export default ProjectArrayInterface