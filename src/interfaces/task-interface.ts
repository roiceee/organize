interface TaskInterface {
    type: "task";
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    deadline: string;
    priority: string;
}

export default TaskInterface;