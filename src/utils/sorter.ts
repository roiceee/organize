import TaskInterface from "../interfaces/task-interface";
function sortByDateCreated(array: Array<TaskInterface>) {
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

function sortByDeadline(array: Array<TaskInterface>) {
  return array.sort((a, b) => {
    if (a.deadline < b.deadline) {
      return 1;
    }
    if (a.deadline > b.deadline) {
      return -1;
    }
    return 0;
  });
}

function sortByPriority(array: Array<TaskInterface>) {
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

function sortByTitle(array: Array<TaskInterface>) {
  return array.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  });
}

export { sortByDateCreated, sortByDeadline, sortByPriority, sortByTitle };
