class Task {
    constructor(title) {
        title.trim() === "" ? this.title = "untitled": this.title = title;
    }
   
    getDetails() {
        return this.title;
    }
}

function createTask(title) {
    return new Task(title);
}

export default createTask(title);