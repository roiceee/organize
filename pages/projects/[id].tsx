import { useRouter } from "next/router";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import UserTypeContext from "../../src/contexts/user-context";
import ProjectInterface from "../../src/interfaces/project-interface";
import ProjectArrayInterface from "../../src/interfaces/project-array-interface";
import formatDate from "../../src/utils/dateFormatter";
import LoadingNotice from "../../src/components/util-components/loading-notice";
import { retrieveFromLocalStorage as retrieveProjectsFromLocalStorage, saveToLocalStorage } from "../../src/utils/local-storage-util";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProjectControl from "../../src/components/tasks-page-components/project-control";
import ErrorNotice from "../../src/components/util-components/error-notice";
import HeadWrapper from "../../src/components/head-wrapper";
import AddTaskModal from "../../src/components/tasks-page-components/add-task-modal";
import Button from "react-bootstrap/Button";
import TaskInterface from "../../src/interfaces/task-interface";
import createProjectObject from "../../src/defaults/default-project";
import createProjectArrayObject from "../../src/defaults/default-project-array-";
import TaskCard from "../../src/components/tasks-page-components/task-card";


function TasksPage() {
  const router = useRouter();
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const [projectArrayState, setProjectArrayState] =
    useState<ProjectArrayInterface>(createProjectArrayObject());
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>(createProjectObject());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [show, setModalShow] = useState<boolean>(false);

  const renderedTasks = useMemo((): JSX.Element | Array<JSX.Element> => {
    const taskCards = currentProjectState?.tasks.map((task) => {
      return <TaskCard key={task.title} task={task} />;
    });
    return taskCards;
  }, [currentProjectState]);

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
    setCurrentProjectState(matchedProject!);
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
        <Row>
          {renderedTasks}
        </Row>
      </Container>
      <AddTaskModal
        show={show}
        setModalShow={setModalShow}
        setProjectArrayState={setProjectArrayState}
        userTypeState={userTypeState}
        currentProjectState={currentProjectState}
        projectArrayState={projectArrayState}
      />
    </>
  );
}

export default TasksPage;
