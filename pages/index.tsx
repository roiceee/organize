import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { useCallback, useContext, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BodyLayoutOne from "../src/components/body-layout-one";
import HeadWrapper from "../src/components/head-wrapper";
import AddProjectModal from "../src/components/projects-page-components/add-project-modal";
import OverviewModal from "../src/components/projects-page-components/overview-modal";
import OverviewTrigger from "../src/components/projects-page-components/overview.trigger";
import ProjectCard from "../src/components/projects-page-components/project-card";
import Quotes from "../src/components/projects-page-components/quotes";
import UndoProjectAlert from "../src/components/projects-page-components/undo-project-alert";
import TaskCalendar from "../src/components/task-calendar";
import ScrollToTopButton from "../src/components/util-components/scroll-to-top-button";
import Sorter from "../src/components/util-components/sorter";
import StickyHeader from "../src/components/util-components/sticky-header";
import ProjectArrayContext from "../src/contexts/project-array-context";
import ProjectContext from "../src/contexts/project-context";
import UndoDeletedProjectContext from "../src/contexts/undo-deleted-project-context";
import UserTypeContext from "../src/contexts/user-context";
import createProjectObject from "../src/defaults/default-project";
import createProjectArrayObject from "../src/defaults/default-project-array-";
import ProjectSortMethods from "../src/enums/project-sorter-methods";
import ProjectArrayInterface from "../src/interfaces/project-array-interface";
import ProjectInterface from "../src/interfaces/project-interface";
import utilStyles from "../src/styles/modules/util-styles.module.scss";
import {
  projectSortByDateCreated,
  projectSortByNumberOfTasks,
  projectSortByTitle,
} from "../src/utils/project-sorts";
import { saveToStorage } from "../src/utils/storage";
import { isNotUser } from "../src/utils/user-checks";

const Home: NextPage = () => {
  const router = useRouter();
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const { projectArrayState, setProjectArrayState } =
    useContext(ProjectArrayContext);
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>(createProjectObject());
  const [showAddProjectModalState, setShowAddProjectModalState] =
    useState<boolean>(false);
  const { undoDeletedProjectAlertState, setUndoDeletedProjectAlertState } =
    useContext(UndoDeletedProjectContext);
  const [sortMethodState, setSortMethodState] = useState<string>(
    ProjectSortMethods.dateCreated
  );
  const [sortOrderState, setSortOrderState] = useState<boolean>(false);
  const [showOverviewModalState, setShowOverviewModalState] =
    useState<boolean>(false);

  //if user is not signed in and is not a local user, then redirect to sign in page
  if (isNotUser(userTypeState)) {
    router.push("/login");
  }

  const showAddProjectModal = useCallback(() => {
    setShowAddProjectModalState(true);
  }, []);

  const hideAddProjectModal = useCallback(() => {
    setShowAddProjectModalState(false);
  }, []);

  const showOverviewModal = useCallback(() => {
    setShowOverviewModalState(true);
  }, []);

  const hideOverviewModal = useCallback(() => {
    setShowOverviewModalState(false);
  }, []);

  const hideUndoDeletedProjectAlert = useCallback(() => {
    setUndoDeletedProjectAlertState(false);
  }, [setUndoDeletedProjectAlertState]);

  const arraySortInverterToggle = useCallback(() => {
    if (!sortOrderState) {
      setSortOrderState(true);
      return;
    }
    setSortOrderState(false);
  }, [sortOrderState]);

  const sortProjects = useCallback(
    (sortState: string): Array<ProjectInterface> => {
      const projectsCopy = projectArrayState.projects.slice(0);
      let sortedProjects: Array<ProjectInterface> =
        new Array<ProjectInterface>();

      switch (sortState) {
        case ProjectSortMethods.dateCreated:
          sortedProjects = projectSortByDateCreated(projectsCopy);
          break;
        case ProjectSortMethods.numOfTasks:
          sortedProjects = projectSortByNumberOfTasks(projectsCopy);
          break;
        case ProjectSortMethods.title:
          sortedProjects = projectSortByTitle(projectsCopy);
          break;
      }
      return sortedProjects;
    },
    [projectArrayState.projects]
  );

  const changeSortState = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setSortMethodState(e.currentTarget.id);
    },
    []
  );

  const renderedProjects = useMemo((): Array<JSX.Element> | JSX.Element => {
    if (projectArrayState === undefined) {
      return <></>;
    }
    const projectCards = sortProjects(sortMethodState).map((project) => {
      return <ProjectCard key={project.id} project={project} />;
    });
    if (!sortOrderState) {
      return projectCards.reverse();
    }
    return projectCards;
  }, [projectArrayState, sortMethodState, sortProjects, sortOrderState]);

  const addProjectToProjectArray = useCallback(
    (newProject: ProjectInterface): void => {
      setProjectArrayState((prevProjectArrayState) => {
        const newProjectArrayState = {
          ...prevProjectArrayState,
          projects: [...prevProjectArrayState.projects, newProject],
        };
        saveToStorage(userTypeState, newProjectArrayState);

        return newProjectArrayState;
      });

      setShowAddProjectModalState(false);
    },
    [setShowAddProjectModalState, setProjectArrayState, userTypeState]
  );

  const undoDeletedProject = useCallback(
    (projectToBeRestored: ProjectInterface) => {
      setProjectArrayState((prevProjectArrayState) => {
        const newProjectArrayState: ProjectArrayInterface = {
          ...prevProjectArrayState,
          projects: [...prevProjectArrayState.projects, projectToBeRestored],
          recentlyDeletedProject: null,
        };
        saveToStorage(userTypeState, newProjectArrayState);
        return newProjectArrayState;
      });
    },
    [userTypeState, setProjectArrayState]
  );

  const clearData = useCallback(() => {
    setProjectArrayState(() => {
      const newProjectArrayState = createProjectArrayObject();
      saveToStorage(userTypeState, newProjectArrayState);
      return newProjectArrayState;
    });
  }, [setProjectArrayState, userTypeState]);

  return (
    <ProjectContext.Provider
      value={{ currentProjectState, setCurrentProjectState }}
    >
      <Container>
        <HeadWrapper />

        <BodyLayoutOne
          leftElements={
            <Row className="sticky-wrapper position-sticky sticky-top">
              <Row className="mx-auto justify-content-center">
                <Col>
                  <div className="d-flex justify-content-end align-items-center mb-2">
                    <OverviewTrigger onClick={showOverviewModal} />
                  </div>
                  <h5 className="my-0 mb-2">
                    Welcome back, {userTypeState.userInformation.name}!
                  </h5>
                </Col>
                <hr />
                <Quotes />
                <hr className="mb-2" />
                <div className="text-center mb-2">
                  <Button
                    className="mx-auto w-75 my-2"
                    variant="action"
                    onClick={showAddProjectModal}
                  >
                    Add new Project
                  </Button>
                </div>
              </Row>
              <TaskCalendar />
            </Row>
          }
          rightElements={
            <>
              <Row className="p-2 pb-4 gap-2 justify-content-center">
                <StickyHeader
                  mainDescriptionDiv={
                    <div className={`${utilStyles.colorAction}`}>
                      {projectArrayState.projects.length <= 1
                        ? projectArrayState.projects.length + " Project"
                        : projectArrayState.projects.length + " Projects"}
                    </div>
                  }
                  sorter={
                    <Sorter
                      sortState={sortMethodState}
                      changeSortStateHandler={changeSortState}
                      arraySortInverterHandler={arraySortInverterToggle}
                      sortingMethodsEnum={ProjectSortMethods}
                    />
                  }
                />
                {projectArrayState.projects.length === 0 && (
                  <div className=" text-center">
                    <span
                      onClick={showAddProjectModal}
                      className={"text-action"}
                    >
                      Create a project
                    </span>{" "}
                    to get started!
                  </div>
                )}
                {renderedProjects}
              </Row>
            </>
          }
        />
        <AddProjectModal
          showState={showAddProjectModalState}
          onHide={hideAddProjectModal}
          onActionButtonClick={addProjectToProjectArray}
        />
        <OverviewModal
          show={showOverviewModalState}
          onHide={hideOverviewModal}
          clearDataHandler={clearData}
        />

        <ScrollToTopButton />
        {projectArrayState.recentlyDeletedProject !== null && (
          <>
            <UndoProjectAlert
              project={projectArrayState.recentlyDeletedProject}
              show={undoDeletedProjectAlertState}
              onHide={hideUndoDeletedProjectAlert}
              onUndoButtonClick={undoDeletedProject}
            />
          </>
        )}
      </Container>
    </ProjectContext.Provider>
  );
};

export default Home;
