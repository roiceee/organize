class Task {
    constructor(index, title, date) {
        title.trim() === "" ? this.title = "untitled": this.title = title;
        date === "Invalid Date" ? this.date = "No Deadline" : this.date = date;
        this.index = index;
    }
    
    setIndex(newIndex) {
        this.index = newIndex;
    }
}

export default function createTask(index, title,date) {
    return new Task(index, title, date);
}

