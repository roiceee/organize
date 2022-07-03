const Project = (name) => {
    let projectName = name;
    let tasks = [];
    const addTask = function(task) {
        tasks.push(task);
    } 
    const getTasks = function() {
        return tasks;
    }
    const getName = function() {
        return projectName;
    }
    return {
        getName,
        addTask,
        getTasks
    }
}

function createProject(name) {
    return Project(name);
}

export default createProject;