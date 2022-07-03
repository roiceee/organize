const Task = (title) => {
    let title = title;
    const getDetails = function() {
        return title;
    }
    return {
        getDetails
    }
}

function createTask(title) {
    return Task(title);
}

export default createTask(title);