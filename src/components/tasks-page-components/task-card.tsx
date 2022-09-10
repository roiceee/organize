import Card from "react-bootstrap/Card";
import TaskInterface from "../../interfaces/task-interface";
import formatDate from "../../utils/dateFormatter";

interface TaskCardProps {
    task : TaskInterface
}

function TaskCard({task} : TaskCardProps) {
    return ( 
        <Card>
            <div>{task.title}</div>
            <div>{formatDate(task.deadline)}</div>
            <div>{task.isDone}</div>
            <div>{task.priority}</div>
        </Card>
     );
}

export default TaskCard;