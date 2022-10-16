import TaskInterface from "../interfaces/task-interface";

function createTaskObject() : TaskInterface {
    return {
        type: "task",
        id: "",
        title: "",
        description: "",
        isDone: false,
        dateCreated: "",
        deadline: "",
        date: "",
        time: "",
        priority: ""
    }
}

export default createTaskObject;