import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BodyLayoutOne from "../../src/components/body-layout-one";
import HeadWrapper from "../../src/components/head-wrapper";
import NoUserContainer from "../../src/components/projects-page-components/no-user-container";
import TaskCalendar from "../../src/components/task-calendar";
import AddTaskButton from "../../src/components/tasks-page-components/add-task-button";
import AddTaskModal from "../../src/components/tasks-page-components/add-task-modal";
import GoBackLink from "../../src/components/tasks-page-components/go-back-link";
import ProjectInfoModal from "../../src/components/tasks-page-components/project-info-modal";
import ProjectSettingsTrigger from "../../src/components/tasks-page-components/project-settings-trigger";
import TaskCard from "../../src/components/tasks-page-components/task-card";
import UndoDeletedTaskAlert from "../../src/components/tasks-page-components/undo-task-alert";
import ErrorNotice from "../../src/components/util-components/error-notice";
import LoadingNotice from "../../src/components/util-components/loading-notice";
import MobileAddButton from "../../src/components/util-components/mobile-add-button";
import ScrollToTopButton from "../../src/components/util-components/scroll-to-top-button";
import ShowTasksTrigger from "../../src/components/util-components/show-tasks-trigger";
import Sorter from "../../src/components/util-components/sorter";
import StickyHeader from "../../src/components/util-components/sticky-header";
import ProjectArrayContext from "../../src/contexts/project-array-context";
import ProjectContext from "../../src/contexts/project-context";
import UndoDeletedProjectContext from "../../src/contexts/undo-deleted-project-context";
import UserTypeContext from "../../src/contexts/user-context";
import createProjectObject from "../../src/defaults/default-project";
import TaskSortMethods from "../../src/enums/task-sorter-methods";
import ProjectArrayInterface from "../../src/interfaces/project-array-interface";
import ProjectInterface from "../../src/interfaces/project-interface";
import TaskInterface from "../../src/interfaces/task-interface";
import utilStyles from "../../src/styles/modules/util-styles.module.scss";
import { formatDate } from "../../src/utils/dateFormatter";
import { saveToStorage } from "../../src/utils/storage";
import {
  taskSortByDateCreated,
  taskSortByDeadline,
  taskSortByPriority,
  taskSortByTitle,
} from "../../src/utils/task-sorts";
import { processDescription } from "../../src/utils/task-utils";
import { isNotUser } from "../../src/utils/user-checks";

//this dynamic page's path uses the projects' projectIDs
function TasksPage() {
  const router = useRouter();
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const { projectArrayState, setProjectArrayState } =
    useContext(ProjectArrayContext);
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>(createProjectObject());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addTaskModalState, setAddTaskModalState] = useState<boolean>(false);
  const [projectSettingsModalState, setProjectSettingsModalState] =
    useState<boolean>(false);
  const [undoDeletedTaskAlertState, setUndoDeletedTaskAlertState] =
    useState<boolean>(false);
  const { undoDeletedProjectAlertState, setUndoDeletedProjectAlertState } =
    useContext(UndoDeletedProjectContext);
  const [sortMethodState, setSortMethodState] = useState<string>(
    TaskSortMethods.deadline
  );
  const [sortOrderState, setSortOrderState] = useState<boolean>(false);
  const [hideDoneTasksState, setHideDoneTasksState] = useState<boolean>(false);

  const showAddTaskModal = useCallback(() => {
    setAddTaskModalState(true);
  }, []);

  const hideAddTaskModal = useCallback(() => {
    setAddTaskModalState(false);
  }, []);

  const showUndoDeletedTaskAlert = useCallback(() => {
    setUndoDeletedTaskAlertState(true);
  }, []);

  const hideUndoDeletedTaskAlert = useCallback(() => {
    setUndoDeletedTaskAlertState(false);
  }, []);

  const showProjectSettingsModal = useCallback(() => {
    setProjectSettingsModalState(true);
  }, []);

  const hideProjectSettingsModal = useCallback(() => {
    setProjectSettingsModalState(false);
  }, []);

  const arraySortInverterToggle = useCallback(() => {
    if (!sortOrderState) {
      setSortOrderState(true);
      return;
    }
    setSortOrderState(false);
  }, [sortOrderState]);

  const hideDoneTasksToggler = useCallback(() => {
    if (!hideDoneTasksState) {
      setHideDoneTasksState(true);
      return;
    }
    setHideDoneTasksState(false);
  }, [hideDoneTasksState]);

  const updateCurrentProjectOnProjectArrayState = useCallback(
    (updatedProject: ProjectInterface) => {
      setProjectArrayState((prevProjectArrayState) => {
        const prevProjectArrayStateCopy = { ...prevProjectArrayState };
        const updatedProjects = prevProjectArrayStateCopy.projects.map(
          (project) => {
            if (project.id === updatedProject.id) {
              updatedProject.lastModified = new Date().toString();
              return updatedProject;
            }
            return project;
          }
        );
        const newProjectArrayState = {
          projects: updatedProjects,
          recentlyDeletedProject: prevProjectArrayState.recentlyDeletedProject,
        };
        saveToStorage(userTypeState, newProjectArrayState);
        return newProjectArrayState;
      });
    },
    [userTypeState, setProjectArrayState]
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

  const taskIsDoneToggler = useCallback(
    (isDone: boolean, task: TaskInterface) => {
      const updatedTask = { ...task, isDone: isDone };
      updateTaskOnCurrentProject(updatedTask);
    },
    [updateTaskOnCurrentProject]
  );

  const deleteProject = useCallback(
    (projectToBeDeleted: ProjectInterface) => {
      setProjectArrayState((prevProjectArrayState) => {
        const projectArrayCopy = { ...prevProjectArrayState };
        const newProjectArray: ProjectArrayInterface = {
          projects: projectArrayCopy.projects.filter((project) => {
            return projectToBeDeleted.id !== project.id;
          }),
          recentlyDeletedProject: projectToBeDeleted,
        };
        saveToStorage(userTypeState, newProjectArray);
        return newProjectArray;
      });
      setUndoDeletedProjectAlertState(true);
      router.push("/");
    },
    [
      userTypeState,
      setUndoDeletedProjectAlertState,
      router,
      setProjectArrayState,
    ]
  );

  const deleteTask = useCallback(
    (taskToBeDeleted: TaskInterface) => {
      setCurrentProjectState((prevProjectState) => {
        const newProjectState: ProjectInterface = {
          ...prevProjectState,
          tasks: prevProjectState.tasks.filter((task) => {
            return taskToBeDeleted.id !== task.id;
          }),
          recentlyDeletedTask: taskToBeDeleted,
        };
        updateCurrentProjectOnProjectArrayState(newProjectState);
        return newProjectState;
      });
      showUndoDeletedTaskAlert();
    },
    [updateCurrentProjectOnProjectArrayState, showUndoDeletedTaskAlert]
  );

  const clearAllTasks = useCallback(() => {
    setCurrentProjectState((prevprojectState) => {
      const newProjectState: ProjectInterface = {
        ...prevprojectState,
        tasks: new Array<TaskInterface>(),
        recentlyDeletedTask: null,
      };
      updateCurrentProjectOnProjectArrayState(newProjectState);
      return newProjectState;
    });
  }, [updateCurrentProjectOnProjectArrayState]);

  const undoDeletedTask = useCallback(
    (taskToBeRestored: TaskInterface) => {
      setCurrentProjectState((prevProjectState) => {
        const newProjectState: ProjectInterface = {
          ...prevProjectState,
          tasks: [...prevProjectState.tasks, taskToBeRestored],
          recentlyDeletedTask: null,
        };
        updateCurrentProjectOnProjectArrayState(newProjectState);
        return newProjectState;
      });
    },
    [updateCurrentProjectOnProjectArrayState]
  );

  const sortTasks = useCallback(
    (tasks: Array<TaskInterface>, sortMethod: string) => {
      let sortedTasks: Array<TaskInterface> = new Array<TaskInterface>();
      switch (sortMethod) {
        case TaskSortMethods.dateCreated:
          sortedTasks = taskSortByDateCreated(tasks);
          break;
        case TaskSortMethods.deadline:
          sortedTasks = taskSortByDeadline(tasks);
          break;
        case TaskSortMethods.priority:
          sortedTasks = taskSortByPriority(tasks);
          break;
        case TaskSortMethods.title:
          sortedTasks = taskSortByTitle(tasks);
      }
      return sortedTasks;
    },
    []
  );

  const changeSortState = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setSortMethodState(e.currentTarget.id);
    },
    []
  );

  const renderedTasks = useMemo((): JSX.Element | Array<JSX.Element> => {
    if (currentProjectState === undefined) {
      return <></>;
    }
    let tasks = currentProjectState.tasks.slice(0);
    if (hideDoneTasksState) {
      tasks = tasks.filter((task) => {
        return !task.isDone;
      });
      if (tasks.length === 0) {
        return <div className="text-center">Nothing to see here.</div>;
      }
    }

    const taskCards = sortTasks(tasks, sortMethodState).map((task) => {
      return (
        <TaskCard
          key={task.id}
          task={task}
          editTaskHandler={updateTaskOnCurrentProject}
          deleteTaskHandler={deleteTask}
          taskIsDoneToggler={taskIsDoneToggler}
        />
      );
    });
    if (!sortOrderState) {
      return taskCards.reverse();
    }
    return taskCards;
  }, [
    updateTaskOnCurrentProject,
    deleteTask,
    taskIsDoneToggler,
    sortMethodState,
    sortTasks,
    sortOrderState,
    currentProjectState,
    hideDoneTasksState,
  ]);

  //this page's route uses the projectID
  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    if (!projectArrayState) {
      return;
    }
    const matchedProject = projectArrayState.projects.find((project) => {
      return project.id === router.query.id;
    });
    setCurrentProjectState(matchedProject!);
    setIsLoading(false);
  }, [router.query.id, projectArrayState, router]);

  //if user is not signed in and is not a local user, then redirect to index page
  if (isNotUser(userTypeState)) {
    return <NoUserContainer />;
  }

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
      <ProjectContext.Provider
        value={{ currentProjectState, setCurrentProjectState }}
      >
        <Container>
          <HeadWrapper title={currentProjectState.title} />
          <BodyLayoutOne
            leftElements={
              <Row className="sticky-wrapper position-sticky sticky-top">
                <div className="d-flex justify-content-between align-items-center my-2">
                  <div>
                    <GoBackLink />
                  </div>
                  <div>
                    <ProjectSettingsTrigger
                      showProjectSettingsModal={showProjectSettingsModal}
                    />
                  </div>
                </div>
                <Row className="mx-0">
                  <h1 style={{ overflowWrap: "break-word" }}>
                    {currentProjectState.title}
                  </h1>
                  {/* <hr className="mx-auto my-1 mb-2" /> */}
                </Row>
                <Row className="mx-0">
                  <div
                    style={{
                      maxHeight: "200px",
                      overflowWrap: "break-word",
                      overflowY: "scroll",
                      fontSize: "0.85rem",
                    }}
                    className="bg-light p-1 rounded-1"
                  >
                    <div>
                      <b>Date Created:</b>{" "}
                      {formatDate(currentProjectState.dateCreated)}
                    </div>
                    <div>
                      <b>Last Modified:</b>{" "}
                      {formatDate(currentProjectState.dateCreated)}
                    </div>
                    <div>
                      <b>Project Description:</b>{" "}
                      {processDescription(currentProjectState)}
                    </div>
                  </div>
                  {/* <hr className="mx-auto my-1 mb-2" /> */}
                </Row>

                <Row className="text-center justify-content-center mx-auto my-3">
                  <AddTaskButton onClick={showAddTaskModal} />
                </Row>
              </Row>
            }
            rightElements={
              <Row className="p-2 pb-4 gap-2 justify-content-center">
                <StickyHeader
                  mainDescriptionDiv={
                    <div
                      className={`my-1 d-flex align-items-center justify-content-center gap-2 ${utilStyles.colorAction}`}
                    >
                      {currentProjectState.tasks.length +
                        currentProjectState.tasks.length <=
                      1
                        ? " Task"
                        : " Tasks"}
                      {currentProjectState.tasks.length > 0 && (
                        <div
                          className="fw-normal"
                          style={{ fontSize: "0.85rem" }}
                        >
                          (
                          {currentProjectState.tasks.reduce((acc, task) => {
                            if (task.isDone) {
                              return acc + 0;
                            }
                            return acc + 1;
                          }, 0)}{" "}
                          pending)
                        </div>
                      )}
                    </div>
                  }
                  showTrigger={
                    <ShowTasksTrigger togglerAction={hideDoneTasksToggler} />
                  }
                  sorter={
                    <Sorter
                      sortState={sortMethodState}
                      changeSortStateHandler={changeSortState}
                      arraySortInverterHandler={arraySortInverterToggle}
                      sortingMethodsEnum={TaskSortMethods}
                    />
                  }
                />
                {currentProjectState.tasks.length === 0 && (
                  <p className="text-center">
                    <span
                      className={"text-action " + utilStyles.underlineAction}
                      onClick={showAddTaskModal}
                    >
                      Create your first task
                    </span>{" "}
                    for this project.
                  </p>
                )}
                <Row className="gap-2 justify-content-center">
                  {renderedTasks}
                </Row>
              </Row>
            }
          />
        </Container>
        <AddTaskModal
          showState={addTaskModalState}
          onHide={hideAddTaskModal}
          onAddTaskButtonClick={addTaskToProject}
        />
        <ProjectInfoModal
          show={projectSettingsModalState}
          onHide={hideProjectSettingsModal}
          editProjectHandler={updateCurrentProjectOnProjectArrayState}
          deleteProjectHandler={deleteProject}
          clearAllTasksHandler={clearAllTasks}
        />
        <ScrollToTopButton />
        {currentProjectState.recentlyDeletedTask !== null && (
          <UndoDeletedTaskAlert
            show={undoDeletedTaskAlertState}
            onHide={hideUndoDeletedTaskAlert}
            task={currentProjectState.recentlyDeletedTask}
            onUndoButtonClick={undoDeletedTask}
          />
        )}
      </ProjectContext.Provider>
    </>
  );
}

export default TasksPage;
