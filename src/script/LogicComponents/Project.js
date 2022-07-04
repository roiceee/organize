class Project  {
    constructor(projectName) {
        projectName.trim() === "" ? this.name = "untitled": this.name = projectName;
    }
    tasks = [];
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