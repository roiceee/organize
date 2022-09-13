import { useRouter } from "next/router";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import UserTypeContext from "../../src/contexts/user-context";
import ProjectInterface from "../../src/interfaces/project-interface";
import ProjectArrayInterface from "../../src/interfaces/project-array-interface";
import formatDate from "../../src/utils/dateFormatter";
import LoadingNotice from "../../src/components/util-components/loading-notice";
import {
  retrieveFromStorage,
  saveToStorage,
} from "../../src/utils/local-storage-util";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProjectControl from "../../src/components/tasks-page-components/project-control";
import ErrorNotice from "../../src/components/util-components/error-notice";
import HeadWrapper from "../../src/components/head-wrapper";
import AddTaskModal from "../../src/components/tasks-page-components/add-task-modal";
import Button from "react-bootstrap/Button";
import createProjectObject from "../../src/defaults/default-project";
import createProjectArrayObject from "../../src/defaults/default-project-array-";
import TaskCard from "../../src/components/tasks-page-components/task-card";
import TaskInterface from "../../src/interfaces/task-interface";
import ProjectDescriptionModal from "../../src/components/tasks-page-components/project-description";

function TasksPage() {
  const router = useRouter();
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const [projectArrayState, setProjectArrayState] =
    useState<ProjectArrayInterface>(createProjectArrayObject());
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>(createProjectObject());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addTaskModalState, setAddTaskModalState] = useState<boolean>(false);
  const [projectDetailsModalState, setProjectDetailsModalState] =
    useState<boolean>(false);

  const renderedTasks = useMemo((): JSX.Element | Array<JSX.Element> => {
    const taskCards = currentProjectState?.tasks.map((task) => {
      return <TaskCard key={task.title} task={task} />;
    });
    return taskCards;
  }, [currentProjectState]);

  const showAddTaskModal = useCallback(() => {
    setAddTaskModalState(true);
  }, []);

  const hideAddTaskModal = useCallback(() => {
    setAddTaskModalState(false);
  }, []);

  const showProjectDetailsModal = useCallback(() => {
    setProjectDetailsModalState(true);
  }, []);

  const hideProjectDetailsModal = useCallback(() => {
    setProjectDetailsModalState(false);
  }, []);

  const updateCurrentProjectOnProjectArrayState = useCallback(
    (updatedProject: ProjectInterface) => {
      setProjectArrayState((prevProjectArrayState) => {
        const prevProjectArrayStateCopy = { ...prevProjectArrayState };
        prevProjectArrayStateCopy.projects.forEach((project, index) => {
          if (project.id === updatedProject.id) {
            prevProjectArrayStateCopy.projects[index] = updatedProject;
          }
        });
        const newProjectArrayState = {
          projects: prevProjectArrayStateCopy.projects,
        };
        saveToStorage(userTypeState, newProjectArrayState);
        return newProjectArrayState;
      });
    },
    [userTypeState]
  );

  const addTaskToProject = useCallback(
    (newTask: TaskInterface) => {
      setCurrentProjectState((prevProjectState) => {
        const newProjectState = {
          ...prevProjectState,
          tasks: [...prevProjectState.tasks, newTask],
        };
        updateCurrentProjectOnProjectArrayState(newProjectState);
        return newProjectState;
      });
      hideAddTaskModal();
    },
    [updateCurrentProjectOnProjectArrayState, hideAddTaskModal]
  );

  useEffect(() => {
    const projects = retrieveFromStorage(userTypeState);
    setProjectArrayState(projects);
    return;

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
        <HeadWrapper title={`Projects | ${router.query.id}`} />
        <Row className="sticky-wrapper position-sticky sticky-top bg-light py-2">
          <Row>
            <h2>{currentProjectState.title}</h2>
            <p>Last Visited: {formatDate(currentProjectState.lastModified)}</p>
            <ProjectControl showProjectDetailsModal={showProjectDetailsModal} />
          </Row>
          <hr className="mx-auto my-1 mb-2" />
          <div className="mb-2">
            <Button variant="action" onClick={showAddTaskModal}>
              Add Task
            </Button>
          </div>
        </Row>
        <Row className="gap-2 p-2 row-cols-lg justify-content-center">
          {renderedTasks}
        </Row>
      </Container>
      <AddTaskModal
        showState={addTaskModalState}
        onHide={hideAddTaskModal}
        onAddTaskButtonClick={addTaskToProject}
        currentProjectState={currentProjectState}
      />
      <ProjectDescriptionModal
        project={currentProjectState}
        showState={projectDetailsModalState}
        onHide={hideProjectDetailsModal}
      />
    </>
  );
}

export default TasksPage;
