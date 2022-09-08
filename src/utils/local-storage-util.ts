import LocalStorageKeyEnum from "../enums/local-storage-key";
import ProjectArrayInterface from "../interfaces/project-array-interface";
import ProjectInterface from "../interfaces/project-interface";

function saveToLocalStorage(project: ProjectArrayInterface) : void {
  localStorage.setItem(LocalStorageKeyEnum.Key, JSON.stringify(project));
}

function retrieveFromLocalStorage() : ProjectArrayInterface {
  const objectString = localStorage.getItem(LocalStorageKeyEnum.Key);
  if (objectString === null) {
    return {
      projects: new Array<ProjectInterface>(),
    };
  }
  return JSON.parse(objectString);
}

export {saveToLocalStorage, retrieveFromLocalStorage}
