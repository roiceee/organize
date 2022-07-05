class Task {
    constructor(index, title, date) {
        title.trim() === "" ? this.title = "untitled": this.title = title;
        date === "" ? this.date = "No Deadline" : this.date = date;
        this.index = index;
    }
}

export default function createTask(index, title,date) {
    return new Task(index, title, date);
}

