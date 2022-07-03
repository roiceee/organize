const Project = () => {
    let tasks = [];
    const addTask = function(task) {
        tasks.push(task);
    } 
    const getTasks = function() {
        return tasks;
    }
    return {
        addTask,
        getTasks
    }
}

function createProject() {
    return Project();
}

export default createProject();