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
import EditProjectModal from "../../src/components/tasks-page-components/edit-project-modal";
import BodyLayoutOne from "../../src/components/body-layout-one";
import StickyHeader from "../../src/components/util-components/sticky-header";
import DescriptionPopover from "../../src/components/tasks-page-components/description-accordion";
import ProjectArrayContext from "../../src/contexts/project-array-context";
import ProjectContext from "../../src/contexts/project-context";
import GoBackLink from "../../src/components/tasks-page-components/go-back-link";
import utilStyles from "../../src/styles/modules/util-styles.module.scss";
import Col from "react-bootstrap/Col";
import DeleteProjectModal from "../../src/components/tasks-page-components/delete-project-modal";
import ScrollToTopButton from "../../src/components/util-components/scroll-to-top-button";

function TasksPage() {
  const router = useRouter();
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const [projectArrayState, setProjectArrayState] =
    useState<ProjectArrayInterface>(createProjectArrayObject());
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>(createProjectObject());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addTaskModalState, setAddTaskModalState] = useState<boolean>(false);
  const [editProjectModalState, setEditProjectModalState] =
    useState<boolean>(false);
  const [deleteProjectModalState, setDeleteProjectModalState] =
    useState<boolean>(false);

  const showAddTaskModal = useCallback(() => {
    setAddTaskModalState(true);
  }, []);

  const hideAddTaskModal = useCallback(() => {
    setAddTaskModalState(false);
  }, []);

  const showEditProjectModal = useCallback(() => {
    setEditProjectModalState(true);
  }, []);

  const hideEditProjectModal = useCallback(() => {
    setEditProjectModalState(false);
  }, []);

  const showDeleteProjectModal = useCallback(() => {
    setDeleteProjectModalState(true);
  }, []);

  const hideDeleteProjectModal = useCallback(() => {
    setDeleteProjectModalState(false);
  }, []);

  const updateCurrentProjectOnProjectArrayState = useCallback(
    (updatedProject: ProjectInterface) => {
      setProjectArrayState((prevProjectArrayState) => {
        const prevProjectArrayStateCopy = { ...prevProjectArrayState };
        const updatedProjects = prevProjectArrayStateCopy.projects.map(
          (project) => {
            if (project.id === updatedProject.id) {
              updatedProject.lastModified = new Date();
              return updatedProject;
            }
            return project;
          }
        );
        const newProjectArrayState = {
          projects: updatedProjects,
        };
        saveToStorage(userTypeState, newProjectArrayState);
        return newProjectArrayState;
      });
      hideEditProjectModal();
    },
    [userTypeState, hideEditProjectModal, setProjectArrayState]
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

  const updateTaskOnCurrentProject = useCallback(
    (updatedTask: TaskInterface) => {
      setCurrentProjectState((prevProjectState) => {
        const tasksCopy = prevProjectState.tasks.slice(0);
        const updatedTasksCopy = tasksCopy.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          }
          return task;
        });
        const newProjectState = {
          ...prevProjectState,
          tasks: updatedTasksCopy,
        };
        updateCurrentProjectOnProjectArrayState(newProjectState);
        return newProjectState;
      });
    },
    [updateCurrentProjectOnProjectArrayState]
  );

  const deleteProject = useCallback(
    (projectToBeDeleted: ProjectInterface) => {
      const newProjectArray: ProjectArrayInterface = {
        projects: projectArrayState.projects.filter((project) => {
          return projectToBeDeleted.id !== project.id;
        }),
      };
      saveToStorage(userTypeState, newProjectArray);
      window.location.href = "/";
    },
    [projectArrayState.projects, userTypeState]
  );

  const deleteTask = useCallback(
    (taskToBeDeleted: TaskInterface) => {
      setCurrentProjectState((prevProjectState) => {
        const newProjectState: ProjectInterface = {
          ...prevProjectState,
          tasks: prevProjectState.tasks.filter((task) => {
            return taskToBeDeleted.id !== task.id;
          }),
        };
        updateCurrentProjectOnProjectArrayState(newProjectState);
        return newProjectState;
      });
    },
    [updateCurrentProjectOnProjectArrayState]
  );

  const renderedTasks = useMemo((): JSX.Element | Array<JSX.Element> => {
    const taskCards = currentProjectState?.tasks.map((task) => {
      return (
        <TaskCard
          key={task.id}
          task={task}
          editTaskHandler={updateTaskOnCurrentProject}
          deleteTaskHandler={deleteTask}
        />
      );
    });
    return taskCards;
  }, [currentProjectState, updateTaskOnCurrentProject, deleteTask]);

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
      <ProjectArrayContext.Provider
        value={{ projectArrayState, setProjectArrayState }}
      >
        <ProjectContext.Provider
          value={{ currentProjectState, setCurrentProjectState }}
        >
          <Container>
            <HeadWrapper title={`Projects | ${router.query.id}`} />
            <BodyLayoutOne
              leftElements={
                <Row className="sticky-wrapper position-sticky sticky-top bg-light py-2">
                  <div className="d-flex justify-content-between">
                    <div>
                      <GoBackLink />
                    </div>
                    <div>
                      <ProjectControl
                        editProjectHandler={showEditProjectModal}
                        deleteProjectHandler={showDeleteProjectModal}
                      />
                    </div>
                  </div>

                  <Row>
                    <h2 style={{ overflowWrap: "break-word" }}>
                      {currentProjectState.title}
                    </h2>
                    <div>
                      Date created:{" "}
                      {formatDate(currentProjectState.dateCreated)}
                    </div>
                    {currentProjectState.description === "" && (
                      <span>No description</span>
                    )}
                    {currentProjectState.description !== "" && (
                      <DescriptionPopover
                        title="Show Project Description"
                        description={currentProjectState.description}
                      />
                    )}
                  </Row>
                  <hr className="mx-auto my-1 mb-3" />
                  <div className="text-center">
                    <Button variant="action w-75" onClick={showAddTaskModal}>
                      Add Task
                    </Button>
                  </div>
                </Row>
              }
              rightElements={
                <Row className="px-2 gap-2 justify-content-center pt-2">
                  <StickyHeader
                    title="Tasks"
                    counter={currentProjectState.tasks.length}
                  />
                  {currentProjectState.tasks.length === 0 && (
                    <p className="text-center">
                      <span
                        className={utilStyles.underlineAction}
                        onClick={showAddTaskModal}
                      >
                        Create a task
                      </span>{" "}
                      to get started!
                    </p>
                  )}
                  {renderedTasks}
                </Row>
              }
            />
          </Container>
          <AddTaskModal
            showState={addTaskModalState}
            onHide={hideAddTaskModal}
            onAddTaskButtonClick={addTaskToProject}
          />
          <EditProjectModal
            showState={editProjectModalState}
            onHide={hideEditProjectModal}
            onActionButtonClick={updateCurrentProjectOnProjectArrayState}
          />
          <DeleteProjectModal
            show={deleteProjectModalState}
            onHide={hideDeleteProjectModal}
            onDeleteProjectButtonClick={deleteProject}
          />
          <ScrollToTopButton/>
        </ProjectContext.Provider>
      </ProjectArrayContext.Provider>
    </>
  );
}

export default TasksPage;
