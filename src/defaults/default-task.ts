import TaskInterface from "../interfaces/task-interface";

function createTaskObject() : TaskInterface {
    return {
        title: "",
        isDone: false,
        deadline: "",
        priority: ""
    }
}

export default createTaskObject;