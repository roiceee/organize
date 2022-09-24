import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BodyLayoutOne from "../../src/components/body-layout-one";
import HeadWrapper from "../../src/components/head-wrapper";
import AddTaskModal from "../../src/components/tasks-page-components/add-task-modal";
import DeleteProjectModal from "../../src/components/tasks-page-components/delete-project-modal";
import DescriptionPopover from "../../src/components/tasks-page-components/description-accordion";
import EditProjectModal from "../../src/components/tasks-page-components/edit-project-modal";
import GoBackLink from "../../src/components/tasks-page-components/go-back-link";
import ProjectControl from "../../src/components/tasks-page-components/project-control";
import TaskCard from "../../src/components/tasks-page-components/task-card";
import TaskSorter from "../../src/components/tasks-page-components/task-sorter";
import ErrorNotice from "../../src/components/util-components/error-notice";
import LoadingNotice from "../../src/components/util-components/loading-notice";
import ScrollToTopButton from "../../src/components/util-components/scroll-to-top-button";
import StickyHeader from "../../src/components/util-components/sticky-header";
import UndoDeletedTaskAlert from "../../src/components/util-components/undo-task-alert";
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
import formatDate from "../../src/utils/dateFormatter";
import { saveToStorage } from "../../src/utils/local-storage-util";
import {
  sortByDateCreated,
  sortByDeadline,
  sortByPriority,
  sortByTitle,
} from "../../src/utils/sorter";

function TasksPage() {
  const router = useRouter();
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const { projectArrayState, setProjectArrayState } =
    useContext(ProjectArrayContext);
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>(createProjectObject());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addTaskModalState, setAddTaskModalState] = useState<boolean>(false);
  const [editProjectModalState, setEditProjectModalState] =
    useState<boolean>(false);
  const [deleteProjectModalState, setDeleteProjectModalState] =
    useState<boolean>(false);
  const [undoDeletedTaskAlertState, setUndoDeletedTaskAlertState] =
    useState<boolean>(false);
  const { undoDeletedProjectAlertState, setUndoDeletedProjectAlertState } =
    useContext(UndoDeletedProjectContext);
  const [sortMethodState, setSortMethodState] = useState<string>(
    TaskSortMethods.dateCreated
  );
  const [sortOrderState, setSortOrderState] = useState<boolean>(false);

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

  const showUndoDeletedTaskAlertState = useCallback(() => {
    setUndoDeletedTaskAlertState(true);
  }, []);

  const hideUndoDeletedTaskAlertState = useCallback(() => {
    setUndoDeletedTaskAlertState(false);
  }, []);

  const arraySortInverterToggle = useCallback(() => {
    if (!sortOrderState) {
      setSortOrderState(true);
      return;
    }
    setSortOrderState(false);
  }, [sortOrderState])

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
          recentlyDeletedProject: prevProjectArrayState.recentlyDeletedProject,
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
      showUndoDeletedTaskAlertState();
    },
    [updateCurrentProjectOnProjectArrayState, showUndoDeletedTaskAlertState]
  );

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
    (sortMethod: string) => {
      const projectTasksCopy = currentProjectState.tasks.slice(0);
      let sortedTasks: Array<TaskInterface> = new Array<TaskInterface>();
      switch (sortMethod) {
        case TaskSortMethods.dateCreated:
          sortedTasks = sortByDateCreated(projectTasksCopy);
          break;
        case TaskSortMethods.deadline:
          sortedTasks = sortByDeadline(projectTasksCopy);
          break;
        case TaskSortMethods.priority:
          sortedTasks = sortByPriority(projectTasksCopy);
          break;
        case TaskSortMethods.title:
          sortedTasks = sortByTitle(projectTasksCopy);
      }
      return sortedTasks;
    },
    [currentProjectState]
  );

  const changeSortState = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setSortMethodState(() => {
        const newSortState = e.currentTarget.id;
        sortTasks(newSortState);
        return newSortState;
      });
    },
    [sortTasks]
  );

  const renderedTasks = useMemo((): JSX.Element | Array<JSX.Element> => {
    const taskCards = sortTasks(sortMethodState).map((task) => {
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
    sortOrderState
  ]);

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
    console.log(matchedProject);
    setCurrentProjectState(matchedProject!);
    setIsLoading(false);
  }, [router.query.id, projectArrayState, router]);

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
          <HeadWrapper title={`${currentProjectState.title} - Organize `} />
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
                    <b>Date Created:</b>{" "}
                    {formatDate(currentProjectState.dateCreated)}
                  </div>
                  <div>
                    <b>Last Modified:</b>{" "}
                    {formatDate(currentProjectState.lastModified)}
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
                  sorter={
                    <TaskSorter
                      sortState={sortMethodState}
                      changeSortStateHandler={changeSortState}
                      arraySortInverterHandler={arraySortInverterToggle}
                    />
                  }
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
        <ScrollToTopButton />
        {currentProjectState.recentlyDeletedTask !== null && (
          <UndoDeletedTaskAlert
            show={undoDeletedTaskAlertState}
            onHide={hideUndoDeletedTaskAlertState}
            task={currentProjectState.recentlyDeletedTask}
            onUndoButtonClick={undoDeletedTask}
          />
        )}
      </ProjectContext.Provider>
    </>
  );
}

export default TasksPage;
