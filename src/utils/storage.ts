import { child, get, ref, set } from "firebase/database";
import createProjectArrayObject from "../defaults/default-project-array-";
import LocalStorageKeyEnum from "../enums/local-storage-key";
import { database } from "../firebase/init";
import ProjectArrayInterface from "../interfaces/project-array-interface";
import TaskInterface from "../interfaces/task-interface";
import UserTypeInterface from "../interfaces/user-interface";

const databaseRef = ref(database);

function saveToLocalStorage(project: ProjectArrayInterface): void {
  localStorage.setItem(LocalStorageKeyEnum.Key, JSON.stringify(project));
}

async function retrieveFromLocalStorage(): Promise<ProjectArrayInterface> {
  const objectString = localStorage.getItem(LocalStorageKeyEnum.Key);
  if (objectString === null) {
    return createProjectArrayObject();
  }
  return JSON.parse(objectString);
}

async function retrieveFromFirebase(userType: UserTypeInterface) : Promise<ProjectArrayInterface> {
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
  return JSON.parse(projectArray);
}

//if user is logged in, then save to firebase cloud storage. Otherwise, save to LocalStorage.
function saveToStorage(
  userType: UserTypeInterface,
  projectArray: ProjectArrayInterface
) {
  if (!userType.isLoggedIn) {
    saveToLocalStorage(projectArray);
    return;
  }
  set(ref(database, "users/" + userType.userInformation.uid), JSON.stringify(projectArray));
}

//if user is logged in, then retrieve from firebase cloud storage. Otherwise, retrieve from LocalStorage.
async function retrieveFromStorage(
  userType: UserTypeInterface
): Promise<ProjectArrayInterface> {
  if (!userType.isLoggedIn) {
    return await retrieveFromLocalStorage();
  }

  return await retrieveFromFirebase(userType);
}

export { saveToStorage, retrieveFromStorage };

