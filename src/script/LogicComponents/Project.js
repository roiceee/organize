class Project  {
    constructor(index, projectName) {
        this.index = index;
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
     getLength() {
        return this.tasks.length;
     }
}

function createProject(index, name) {
    return new Project(index, name);
}

export default createProject;