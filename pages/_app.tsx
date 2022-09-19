import "../src/styles/globals.css";
import "../src/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../src/components/layout";
import UserTypeContext from "../src/contexts/user-context";
import UserTypeInterface from "../src/interfaces/user-interface";
import { useState, useEffect, useCallback } from "react";
import ProjectArrayContext from "../src/contexts/project-array-context";
import ProjectArrayInterface from "../src/interfaces/project-array-interface";
import createProjectArrayObject from "../src/defaults/default-project-array-";
import { retrieveFromStorage, saveToStorage } from "../src/utils/local-storage-util";
import LoadingNotice from "../src/components/util-components/loading-notice";
import UndoProjectAlert from "../src/components/util-components/undo-project-alert";
import UndoDeletedProjectContext from "../src/contexts/undo-deleted-project-context";
import ProjectInterface from "../src/interfaces/project-interface";

function MyApp({ Component, pageProps }: AppProps) {
  //isLoggedIn value is set to false by default to use localStorage by default
  const [userTypeState, setUserStateType] = useState<UserTypeInterface>({
    isLoggedIn: false,
  });
  const [projectArrayState, setProjectArrayState] =
    useState<ProjectArrayInterface>(createProjectArrayObject());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [undoDeletedProjectAlertState, setUndoDeletedProjectAlertState] =
    useState<boolean>(false);


  useEffect(() => {
    console.log(projectArrayState);
    console.log(undoDeletedProjectAlertState)
  });

  useEffect(() => {
    const projects = retrieveFromStorage(userTypeState);
    setProjectArrayState(projects);
    setIsLoading(false);
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
        <UndoDeletedProjectContext.Provider value={{undoDeletedProjectAlertState, setUndoDeletedProjectAlertState}}>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </UndoDeletedProjectContext.Provider>
      </ProjectArrayContext.Provider>
    </UserTypeContext.Provider>
  );
}

export default MyApp;
