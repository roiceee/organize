import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserTypeContext from "../../src/contexts/user-context";
import ProjectInterface from "../../src/interfaces/project-interface";
import ProjectArrayInterface from "../../src/interfaces/project-array-interface";
import formatDate from "../../src/utils/dateFormatter";
import LoadingNotice from "../../src/components/util-components/loading-notice";
import { retrieveFromLocalStorage as retrieveProjectsFromLocalStorage } from "../../src/utils/local-storage-util";

function TasksPage() {
  const router = useRouter();
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const [projectArrayState, setProjectArrayState] =
    useState<ProjectArrayInterface>();
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>();

  useEffect(() => {
    if (!projectArrayState) {
      return;
    }
    const matchedProject = projectArrayState.projects.find((project) => {
      return project.id === router.query.id;
    });
    setCurrentProjectState(matchedProject);
  }, [router.query.id, projectArrayState]);

  useEffect(() => {
    if (!userTypeState.isLoggedIn) {
      const projects = retrieveProjectsFromLocalStorage();
      setProjectArrayState(projects);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentProjectState) {
    return <LoadingNotice />;
  }

  return (
    <div>
      {/* {projectArrayState.projects} */}
      <h3>{currentProjectState.title}</h3>
      <div>{formatDate(currentProjectState.lastModified)}</div>
    </div>
  );
}

export default TasksPage;
