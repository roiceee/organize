import createTask from "./Task.js";
class Project  {
    constructor(index, projectName) {
        this.index = index;
        projectName.trim() === "" ? this.name = "untitled": this.name = projectName;
        this.tasks = [];
    }
     setTasks(tasks) {
        tasks.forEach(task => {
         this.tasks.push(createTask(task.index, task.title, task.date, task.checked));
        })
    }
    setIndex(newIndex) {
      this.index = newIndex;
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
     getTask(index) {
        return this.tasks[index];
     }
     deleteTask(index) {
        this.tasks.splice(index,1);
        this.resetTasksIndex(index);
     }
     resetTasksIndex(start) {
      for (let i = start; i < this.tasks.length; i++) {
         this.tasks[i].setIndex(i.toString());
      }
     }

}

function createProject(index, name) {
    return new Project(index, name);
}

export default createProject;