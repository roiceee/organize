interface TaskInterface {
    title: string;
    content: string | undefined;
    isDone: boolean;
    deadline: Date;
}

export default TaskInterface;