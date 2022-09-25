import ProjectInterface from "../interfaces/project-interface";

function projectSortByNumberOfTasks(array: Array<ProjectInterface>) {
  return array.sort((a, b) => {
    if (a.tasks.length < b.tasks.length) {
      return 1;
    }
    if (a.tasks.length > b.tasks.length) {
      return -1;
    }
    return 0;
  });
}

function projectSortByDateCreated(array: Array<ProjectInterface>) {
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

function projectSortByTitle(array: Array<ProjectInterface>) {
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

export {
    projectSortByNumberOfTasks,
    projectSortByDateCreated,
    projectSortByTitle,
};

