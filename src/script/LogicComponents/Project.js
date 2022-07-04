class Project  {
    constructor(projectName) {
        projectName.trim() === "" ? this.name = "untitled": this.name = projectName;
        this.tasks = [];
    }
    setTasks(tasks) {
        this.tasks = tasks;
    }
    
     addTask(task) {
        this.tasks.push(task);
    } 
     getTasks() {
        return this.tasks;
    }
     getName() {
        return this.name;
    }
}

function createProject(name) {
    return new Project(name);
}

export default createProject;