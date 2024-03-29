import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
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
import { createEmptyUser } from "../defaults/default-user";
import { auth } from "../firebase/init";
import userIcon from "../images/user-icon.svg";
import ProjectArrayInterface from "../interfaces/project-array-interface";
import UserTypeInterface from "../interfaces/user-interface";
import {
  retrieveFromStorage,
  retrieveLastUserSessionType,
  saveLastUserSession,
} from "../utils/storage";
import { isNotUser } from "../utils/user-checks";
import { appCheck } from "../firebase/init";

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
      const result = await signInWithRedirect(auth, provider);
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
  }, []);

  useEffect(() => {
    //firebase appCheck
    appCheck();
    setUserStateType(retrieveLastUserSessionType());
    //get auth redirect result
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        console.log("yeah");
        if (!result) {
          return;
        }
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
          return;
        }
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        destructureUserToUserTypeState(user);
        router.push("/");
        setIsAppLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    setLoadOtherEffects(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        return;
      }
      destructureUserToUserTypeState(user);
    });
  }, [destructureUserToUserTypeState]);

  useEffect(() => {
    if (!loadOtherEffects) {
      return;
    }
    if (isNotUser(userTypeState)) {
      setIsAppLoading(false);
      return;
    }
    async function getProjectArray() {
      const projects = await retrieveFromStorage(userTypeState);
      setProjectArrayState(projects);
      //set app loading to false when project array is fetched from database
      setIsAppLoading(false);
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
      <IsAppLoadingContext.Provider value={{ isAppLoading: isAppLoading }}>
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
