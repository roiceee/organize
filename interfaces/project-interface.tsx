import TaskInterface from "./task-interface";

interface ProjectInterface {
  title: string;
  description: string | undefined;
  dateCreated: Date;
  lastModified: Date;
  tasks: TaskInterface[];
}

export default ProjectInterface;
