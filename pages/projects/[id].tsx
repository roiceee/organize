import { useRouter } from "next/router";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import UserTypeContext from "../../src/contexts/user-context";
import ProjectInterface from "../../src/interfaces/project-interface";
import ProjectArrayInterface from "../../src/interfaces/project-array-interface";
import formatDate from "../../src/utils/dateFormatter";
import LoadingNotice from "../../src/components/util-components/loading-notice";
import { retrieveFromLocalStorage as retrieveProjectsFromLocalStorage } from "../../src/utils/local-storage-util";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProjectControl from "../../src/components/tasks-page-components/project-control";
import ErrorNotice from "../../src/components/util-components/error-notice";
import HeadWrapper from "../../src/components/head-wrapper";
import AddTaskModal from "../../src/components/tasks-page-components/add-task-modal";
import Button from "react-bootstrap/Button";
import TaskInterface from "../../src/interfaces/task-interface";

function TasksPage() {
  const router = useRouter();
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const [projectArrayState, setProjectArrayState] =
    useState<ProjectArrayInterface>();
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [show, setModalShow] = useState<boolean>(false);

  // const renderedTasks = useMemo(() : JSX.Element | Array<JSX.Element> => {
  //     const tasks = currentProjectState?.tasks.map((task) => {
  //       return //task cards
  //     })
  // }, [currentProjectState])

  // const addTaskToProject = useCallback((task : TaskInterface) => {
  //   setCurrentProjectState((prevProjectState) => ({
  //     ...prevProjectState,
  //   }));
  // }, []);

  useEffect(() => {
    if (!userTypeState.isLoggedIn) {
      const projects = retrieveProjectsFromLocalStorage();
      setProjectArrayState(projects);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!projectArrayState) {
      return;
    }
    const matchedProject = projectArrayState.projects.find((project) => {
      return project.id === router.query.id;
    });
    setCurrentProjectState(matchedProject);
    setIsLoading(false);
  }, [router.query.id, projectArrayState]);

  if (isLoading) {
    return <LoadingNotice />;
  }

  if (!currentProjectState) {
    if (!isLoading) {
      return;
    }
    return <ErrorNotice />;
  }

  return (
    <>
      <Container>
        <HeadWrapper title={`Organize | ${router.query.id}`} />
        <Row>
          <h2>{currentProjectState.title}</h2>
          <p>Last Visited: {formatDate(currentProjectState.lastModified)}</p>
          <ProjectControl />
        </Row>
        <hr className="mx-auto my-1 mb-2" />
        <div>
          <Button variant="action" onClick={() => setModalShow(true)}>
            Add Task
          </Button>
        </div>
      </Container>
      <AddTaskModal
        show={show}
        setModalShow={setModalShow}
        setCurrentProjectState={setCurrentProjectState}
      />
    </>
  );
}

export default TasksPage;
