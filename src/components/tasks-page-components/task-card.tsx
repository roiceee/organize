import TaskInterface from "../../interfaces/task-interface";
import formatDate from "../../utils/dateFormatter";
import styles from "../../styles/modules/task-card.module.scss"
import _ from "lodash";

interface TaskCardProps {
  task: TaskInterface;
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="rounded-2 border border-1 bg-white d-flex p-0 gap-2">
      <div className={`${styles.prioIndicator} `}></div>
      <div>
        <h5>{task.title}</h5>
        <div>Deadline: {formatDate(task.deadline)}</div>
        <div>Priority: {_.capitalize(task.priority)}</div>
      </div>
    </div>
  );
}

export default TaskCard;
