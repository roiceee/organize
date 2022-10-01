import { initializeApp } from "firebase/app";
import {
  getAuth,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import createProjectArrayObject from "../defaults/default-project-array-";
import { createDefaultUser, createEmptyUser } from "../defaults/default-user";
import firebaseConfig from "../firebase/credentials";
import ProjectArrayInterface from "../interfaces/project-array-interface";
import UserTypeInterface from "../interfaces/user-interface";
import { retrieveFromStorage } from "../utils/local-storage-util";
import userIcon from "../images/user-icon.svg";
import ProjectArrayContext from "../contexts/project-array-context";
import UndoDeletedProjectContext from "../contexts/undo-deleted-project-context";
import UserTypeContext from "../contexts/user-context";
import UserSignInContext from "../contexts/user-sign-in-context";
import IsAppLoadingContext from "../contexts/is-app-loading-context";
import TaskCalendarToggleContext from "../contexts/task-calendar-toggle-context";

//this is where the providers and global state and contexts are added so that app.tsx is not convoluted
interface ControlLayerProps {
  children: JSX.Element;
}

function ControlLayer({ children }: ControlLayerProps) {
  const [userTypeState, setUserStateType] = useState<UserTypeInterface>(
    createEmptyUser()
  );
  const [projectArrayState, setProjectArrayState] =
    useState<ProjectArrayInterface>(createProjectArrayObject());
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [undoDeletedProjectAlertState, setUndoDeletedProjectAlertState] =
    useState<boolean>(false);
  const [showCalendarState, setShowCalendarState] = useState<boolean>(true);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  const destructureUserToTypeState = useCallback((userAuth: User) => {
    setUserStateType({
      userInformation: {
        name: userAuth.displayName,
        email: userAuth.email,
        photoURL: userAuth.photoURL === null ? userIcon : userAuth.photoURL,
      },
      isLoggedIn: true,
    });
  }, []);

  const userSignIn = useCallback(async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
    } catch {
      console.log("error");
    }
  }, [auth]);

  const userSignOut = useCallback(async () => {
    try {
      const result = signOut(auth)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.log("error");
    }
  }, [auth]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setUserStateType(createDefaultUser());
        setIsAppLoading(false);
        return;
      }
      destructureUserToTypeState(user);
      setIsAppLoading(false);
    });
  }, [auth, destructureUserToTypeState]);

  useEffect(() => {
    const projects = retrieveFromStorage(userTypeState);
    setProjectArrayState(projects);
  }, [userTypeState, isAppLoading]);

  return (
    <>
      <IsAppLoadingContext.Provider value={isAppLoading}>
        <UserTypeContext.Provider value={{ userTypeState, setUserStateType }}>
          <ProjectArrayContext.Provider
            value={{ projectArrayState, setProjectArrayState }}
          >
            <UndoDeletedProjectContext.Provider
              value={{
                undoDeletedProjectAlertState,
                setUndoDeletedProjectAlertState,
              }}
            >
              <TaskCalendarToggleContext.Provider
                value={{ showCalendarState, setShowCalendarState }}
              >
                <UserSignInContext.Provider value={{ userSignIn, userSignOut }}>
                  {children}
                </UserSignInContext.Provider>
              </TaskCalendarToggleContext.Provider>
            </UndoDeletedProjectContext.Provider>
          </ProjectArrayContext.Provider>
        </UserTypeContext.Provider>
      </IsAppLoadingContext.Provider>
    </>
  );
}

export default ControlLayer;
