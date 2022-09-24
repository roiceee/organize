import TaskInterface from "./task-interface";

interface ProjectInterface {
  type: "project";
  id: string;
  title: string;
  description: string | string;
  dateCreated: Date | string;
  lastModified: Date | string;
  tasks: Array<TaskInterface>;
  recentlyDeletedTask: TaskInterface | null;
}

export default ProjectInterface;
