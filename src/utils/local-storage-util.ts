import LocalStorageKeyEnum from "../enums/local-storage-key";
import ProjectArrayInterface from "../interfaces/project-array-interface";
import ProjectInterface from "../interfaces/project-interface";

function saveToLocalStorage(project: ProjectArrayInterface) {
  localStorage.setItem(LocalStorageKeyEnum.Key, JSON.stringify(project));
}

function retrieveFromLocalStorage(project: ProjectArrayInterface) {
  const objectString = localStorage.getItem(LocalStorageKeyEnum.Key);
  if (objectString === null) {
    return {
      project: new Array<ProjectInterface>(),
    };
  }
  return JSON.parse(objectString);
}
