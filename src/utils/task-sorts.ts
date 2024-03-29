import TaskInterface from "../interfaces/task-interface";
function taskSortByDateCreated(array: Array<TaskInterface>) {
  return array.sort((a, b) => {
    if (a.dateCreated < b.dateCreated) {
      return 1;
    }
    if (a.dateCreated > b.dateCreated) {
      return -1;
    }
    return 0;
  });
}

function taskSortByTitle(array: Array<TaskInterface>) {
  return array.sort((a, b) => {
    if (a.title < b.title) {
      return 1;
    }
    if (a.title > b.title) {
      return -1;
    }
    return 0;
  });
}

function taskSortByDeadline(array: Array<TaskInterface>) {
  return array.sort((a, b) => {
    if (a.deadline === "") {
      return -1;
    }
    const aDeadline = new Date(a.deadline);
    const bDeadline = new Date(b.deadline);

    if (aDeadline < bDeadline) {
      return 1;
    }
    if (aDeadline > bDeadline) {
      return -1;
    }
    return 0;
  });
}

function taskSortByPriority(array: Array<TaskInterface>) {
  function convertPriorityToNumber(priority: string): number {
    switch (priority) {
      case "low":
        return 1;
      case "medium":
        return 2;
      case "high":
        return 3;
    }
    return 0;
  }

  return array.sort((a, b) => {
    const priorityNumberA = convertPriorityToNumber(a.priority);
    const priorityNumberB = convertPriorityToNumber(b.priority);
    if (priorityNumberA < priorityNumberB) {
      return 1;
    }
    if (priorityNumberA > priorityNumberB) {
      return -1;
    }
    return 0;
  });
}

export {
  taskSortByDateCreated,
  taskSortByDeadline,
  taskSortByPriority,
  taskSortByTitle,
};
