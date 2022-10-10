import { child, get, ref, set } from "firebase/database";
import createProjectArrayObject from "../defaults/default-project-array-";
import { createDefaultUser } from "../defaults/default-user";
import LocalStorageKeyEnum from "../enums/local-storage-key";
import { database } from "../firebase/init";
import ProjectArrayInterface from "../interfaces/project-array-interface";
import TaskInterface from "../interfaces/task-interface";
import UserTypeInterface from "../interfaces/user-interface";
import { isLocalUser } from "./user-checks";

const databaseRef = ref(database);

function saveLastUserSession(userType: UserTypeInterface) {
  localStorage.setItem(
    LocalStorageKeyEnum.IsLastSessionLoggedInKey,
    JSON.stringify(userType)
  );
}

function retrieveLastUserSessionType(): UserTypeInterface {
  const userType = localStorage.getItem(
    LocalStorageKeyEnum.IsLastSessionLoggedInKey
  );
  if (userType === null) {
    return createDefaultUser();
  }
  return JSON.parse(userType);
}

function saveToLocalStorage(project: ProjectArrayInterface): void {
  localStorage.setItem(LocalStorageKeyEnum.ProjectKey, JSON.stringify(project));
}

async function retrieveFromLocalStorage(): Promise<ProjectArrayInterface> {
  const objectString = localStorage.getItem(LocalStorageKeyEnum.ProjectKey);
  if (objectString === null) {
    return createProjectArrayObject();
  }
  return JSON.parse(objectString);
}

async function retrieveFromFirebase(
  userType: UserTypeInterface
): Promise<ProjectArrayInterface> {
  let projectArray = "";
  await get(child(databaseRef, "users/" + userType.userInformation.uid))
    .then((snapshot) => {
      if (snapshot.exists()) {
        projectArray = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  if (projectArray === "") {
    return createProjectArrayObject();
  }
  return JSON.parse(projectArray);
}

//if user is logged in, then save to firebase cloud storage. Otherwise, save to LocalStorage.
function saveToStorage(
  userType: UserTypeInterface,
  projectArray: ProjectArrayInterface
) {
  if (isLocalUser(userType)) {
    saveToLocalStorage(projectArray);
    return;
  }
  set(
    ref(database, "users/" + userType.userInformation.uid),
    JSON.stringify(projectArray)
  );
}

//if user is logged in, then retrieve from firebase cloud storage. Otherwise, retrieve from LocalStorage.
async function retrieveFromStorage(
  userType: UserTypeInterface
): Promise<ProjectArrayInterface> {
  if (isLocalUser(userType)) {
    return await retrieveFromLocalStorage();
  }
  return await retrieveFromFirebase(userType);
}

export {
  saveToStorage,
  retrieveFromStorage,
  saveLastUserSession,
  retrieveLastUserSessionType,
};
