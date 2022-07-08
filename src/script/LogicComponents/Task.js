class Task {
    constructor(index, title, date, checked) {
        title.trim() === "" ? this.title = "untitled": this.title = title;
        date === "Invalid Date" ? this.date = "No Deadline" : this.date = date;
        this.index = index;
        this.checked = checked;
        
    }
    setChecked(boolean) {
        this.checked = boolean;
        console.log(this.checked);
    }
    setIndex(newIndex) {
        this.index = newIndex;
    }
}

export default function createTask(index, title,date, checked) {
    return new Task(index, title, date, checked);
}

