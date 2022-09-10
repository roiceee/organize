import LocalStorageKeyEnum from "../enums/local-storage-key";
import ProjectArrayInterface from "../interfaces/project-array-interface";
import ProjectInterface from "../interfaces/project-interface";
import UserTypeInterface from "../interfaces/user-interface";

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

//if user is logged in, then save to firebase cloud storage. Otherwise, save to LocalStorage.
function saveToStorage(userType : UserTypeInterface, project: ProjectArrayInterface) {
  if (!userType.isLoggedIn) {
    saveToLocalStorage(project);
  }
}

//if user is logged in, then retrieve from firebase cloud storage. Otherwise, retrieve from LocalStorage.
function retrieveFromStorage(userType : UserTypeInterface) : ProjectArrayInterface {
  if (!userType.isLoggedIn) {
   //put retrieveFromLocalStorage() 👇 here once firebase is included in the project
  }
  return retrieveFromLocalStorage();
}

export {saveToStorage, retrieveFromStorage}
