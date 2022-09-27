import type { AppProps } from "next/app";
import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../src/components/layout";
import LoadingNotice from "../src/components/util-components/loading-notice";
import ProjectArrayContext from "../src/contexts/project-array-context";
import UndoDeletedProjectContext from "../src/contexts/undo-deleted-project-context";
import UserTypeContext from "../src/contexts/user-context";
import createProjectArrayObject from "../src/defaults/default-project-array-";
import ProjectArrayInterface from "../src/interfaces/project-array-interface";
import UserTypeInterface from "../src/interfaces/user-interface";
import "../src/styles/globals.scss";
import { retrieveFromStorage } from "../src/utils/local-storage-util";
import {
  createDefaultUser,
  createEmptyUser,
} from "../src/defaults/default-user";
import UserDiv from "../src/components/user-div";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../src/firebase/credentials";
import userIcon from "../src/images/user-icon.svg";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
} from "firebase/auth";

function MyApp({ Component, pageProps }: AppProps) {
  //isLoggedIn value is set to false by default to use localStorage by default
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


  if (isLoading) {
    return (
      <Layout>
        <LoadingNotice />
      </Layout>
    );
  }

  return (
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
          <Layout>
            <>
              <UserDiv
                signInHandler={userSignIn}
                signOutHandler={userSignOut}
              />
              <Component {...pageProps} />
            </>
          </Layout>
        </UndoDeletedProjectContext.Provider>
      </ProjectArrayContext.Provider>
    </UserTypeContext.Provider>
  );
}

export default MyApp;
