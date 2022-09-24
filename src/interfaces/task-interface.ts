interface TaskInterface {
    type: "task";
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    dateCreated: string | Date;
    deadline: string;
    priority: string;
}

export default TaskInterface;