interface TaskInterface {
    type: "task";
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    dateCreated: string;
    deadline: string;
    date: string | undefined;
    time: string|undefined;
    priority: string;
}

export default TaskInterface;