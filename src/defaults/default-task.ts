import TaskInterface from "../interfaces/task-interface";

function createTaskObject() : TaskInterface {
    return {
        id: "",
        title: "",
        description: "",
        isDone: false,
        deadline: "",
        priority: ""
    }
}

export default createTaskObject;