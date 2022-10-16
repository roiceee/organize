interface TaskInterface {
    type: "task";
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    dateCreated: string;
    deadline: string;
    date: string;
    time: string;
    priority: string;
}

export default TaskInterface;