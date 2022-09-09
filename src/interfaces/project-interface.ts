import TaskInterface from "./task-interface";

interface ProjectInterface {
  id: string;
  title: string;
  description: string | string;
  dateCreated: Date | string;
  lastModified: Date | string;
  tasks: Array<TaskInterface>;
}

export default ProjectInterface;
