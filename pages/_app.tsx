import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
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
        <UndoDeletedProjectContext.Provider
          value={{
            undoDeletedProjectAlertState,
            setUndoDeletedProjectAlertState,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UndoDeletedProjectContext.Provider>
      </ProjectArrayContext.Provider>
    </UserTypeContext.Provider>
  );
}

export default MyApp;
