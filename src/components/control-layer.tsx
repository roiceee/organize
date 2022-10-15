import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
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
import InstallPWAContext from "../contexts/install-PWA-context";

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
  const [showInstallPWADiv, setShowInstallPWADiv] = useState(false);
  const installPWAPrompt = useRef<Event | null>();

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

  const showInstallPWA = useCallback(() => {
    setShowInstallPWADiv(true);
  }, []);

  const hideInstallPWA = useCallback(() => {
    setShowInstallPWADiv(false);
  }, []);

  const installPWA = useCallback(async () => {
    if (installPWAPrompt.current) {
      // @ts-ignore
      installPWAPrompt.current.prompt();
      // @ts-ignore
      const { outcome } = await installPWAPrompt.current.userChoice;
      if (outcome === "accepted") {
        installPWAPrompt.current = null;
      }
    }
  }, []);

  useEffect(() => {
    //firebase appCheck
    appCheck();
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

  //this is for the PWA install state
  const installPWADivRelaunch = useRef(true);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: Event) => {
      if (installPWADivRelaunch.current === false) {
        console.log("yeah");
        return;
      }
      showInstallPWA();
      installPWAPrompt.current = e;
      installPWADivRelaunch.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <InstallPWAContext.Provider
                    value={{
                      showInstallPWADiv,
                      installPWA,
                      hideInstallPWA,
                    }}
                  >
                    {children}
                  </InstallPWAContext.Provider>
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
