import TaskInterface from "./task-interface";

interface ProjectInterface {
  title: string;
  description: string | undefined;
  dateCreated: Date | undefined;
  lastModified: Date | undefined;
  tasks: TaskInterface[];
}

export default ProjectInterface;
