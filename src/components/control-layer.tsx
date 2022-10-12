import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import IsAppLoadingContext from "../contexts/is-app-loading-context";
import ProjectArrayContext from "../contexts/project-array-context";
import TaskCalendarToggleContext from "../contexts/task-calendar-toggle-context";
import UndoDeletedProjectContext from "../contexts/undo-deleted-project-context";
import UserTypeContext from "../contexts/user-context";
import UserSignInContext from "../contexts/user-sign-in-context";
import createProjectArrayObject from "../defaults/default-project-array-";
import { createDefaultUser, createEmptyUser } from "../defaults/default-user";
import { auth } from "../firebase/init";
import userIcon from "../images/user-icon.svg";
import ProjectArrayInterface from "../interfaces/project-array-interface";
import UserTypeInterface from "../interfaces/user-interface";
import {
  retrieveFromStorage,
  retrieveLastUserSessionType,
  saveLastUserSession,
} from "../utils/storage";
import { isLocalUser, isLoggedInUser, isNotUser } from "../utils/user-checks";

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
  const [loadOtherEffects, setLoadOtherEffects] = useState(false);
  const router = useRouter();

  const destructureUserToUserTypeState = useCallback((userAuth: User) => {
    setUserStateType({
      userInformation: {
        uid: userAuth.uid,
        name: userAuth.displayName,
        email: userAuth.email,
        photoURL: userAuth.photoURL === null ? userIcon : userAuth.photoURL,
      },
      isLoggedIn: true,
      isLocalUser: false,
    });
  }, []);

  const userSignIn = useCallback(async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
    } catch {
      console.log("error");
    }
  }, []);

  const userSignOut = useCallback(async () => {
    setUserStateType(createEmptyUser());
    try {
      const result = signOut(auth)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    } catch {
      console.log("error");
    }
    router.push("/login");
  }, [router]);

  useEffect(() => {
    setUserStateType(retrieveLastUserSessionType());
    setLoadOtherEffects(true);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsAppLoading(false);
        return;
      }
      destructureUserToUserTypeState(user);
      setIsAppLoading(false);
    });
  }, [destructureUserToUserTypeState]);

  useEffect(() => {
    if (!loadOtherEffects) {
      return;
    }
    async function getProjectArray() {
      const projects = await retrieveFromStorage(userTypeState);
      setProjectArrayState(projects);
    }
    if (isNotUser(userTypeState)) {
      return;
    }
    getProjectArray();
  }, [userTypeState, isAppLoading, loadOtherEffects]);

  useEffect(() => {
    if (!loadOtherEffects) {
      return;
    }
    saveLastUserSession(userTypeState);
  }, [userTypeState, loadOtherEffects]);

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
