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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [undoDeletedProjectAlertState, setUndoDeletedProjectAlertState] =
    useState<boolean>(false);

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
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider);
    } catch {
      console.log("error");
    }
  }, [auth]);

  const userSignOut = useCallback(async () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }, [auth]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setUserStateType(createDefaultUser());
        setIsLoading(false);
        return;
      }
      destructureUserToTypeState(user);
      setIsLoading(false);
    });
  }, [auth, destructureUserToTypeState]);

  useEffect(() => {
    const projects = retrieveFromStorage(userTypeState);
    setProjectArrayState(projects);
  }, [userTypeState]);
  return (
    <>
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
            <UserSignInContext.Provider value={{ userSignIn, userSignOut }}>
              {children}
            </UserSignInContext.Provider>
          </UndoDeletedProjectContext.Provider>
        </ProjectArrayContext.Provider>
      </UserTypeContext.Provider>
    </>
  );
}

export default ControlLayer;
