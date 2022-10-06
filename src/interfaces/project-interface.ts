import TaskInterface from "./task-interface";

interface ProjectInterface {
  type: "project";
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  lastModified: string;
  tasks: Array<TaskInterface>;
  recentlyDeletedTask: TaskInterface | null;
}

export default ProjectInterface;
