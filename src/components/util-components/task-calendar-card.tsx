import Link from "next/link";
import TaskInterface from "../../interfaces/task-interface";


interface TaskCalendarCardProps {
  projectID: string;
  task: TaskInterface;
}

function TaskCalendarCard({ projectID, task }: TaskCalendarCardProps) {

  return (
    <Link href={`/projects/${projectID}`}>
      <div>
        {task.title}
      </div>
    </Link>
  );
}

export default TaskCalendarCard;
