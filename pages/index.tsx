import type { NextPage } from "next";
import { useCallback, useContext, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BodyLayoutOne from "../src/components/body-layout-one";
import HeadWrapper from "../src/components/head-wrapper";
import AddProjectModal from "../src/components/projects-page-components/add-project-modal";
import Overview from "../src/components/projects-page-components/overview-accordion";
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
import ProjectSortMethods from "../src/enums/project-sorter-methods";
import ProjectArrayInterface from "../src/interfaces/project-array-interface";
import ProjectInterface from "../src/interfaces/project-interface";
import utilStyles from "../src/styles/modules/util-styles.module.scss";
import { saveToStorage } from "../src/utils/storage";
import {
  projectSortByDateCreated,
  projectSortByNumberOfTasks,
  projectSortByTitle,
} from "../src/utils/project-sorts";

const Home: NextPage = () => {
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const { projectArrayState, setProjectArrayState } =
    useContext(ProjectArrayContext);
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>(createProjectObject());
  const [showState, setModalShow] = useState<boolean>(false);
  const { undoDeletedProjectAlertState, setUndoDeletedProjectAlertState } =
    useContext(UndoDeletedProjectContext);
  const [sortMethodState, setSortMethodState] = useState<string>(
    ProjectSortMethods.dateCreated
  );
  const [sortOrderState, setSortOrderState] = useState<boolean>(false);

  const showAddProjectModal = useCallback(() => {
    setModalShow(true);
  }, []);

  const hideAddProjectModal = useCallback(() => {
    setModalShow(false);
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

      setModalShow(false);
    },
    [setModalShow, setProjectArrayState, userTypeState]
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

  return (
    <ProjectContext.Provider
      value={{ currentProjectState, setCurrentProjectState }}
    >
      <Container>
        <HeadWrapper title="Organize | Home" />

        <BodyLayoutOne
          leftElements={
            <Row className="sticky-wrapper position-sticky sticky-top bg-white border rounded-2 py-3 ">
              <Row className="mx-auto justify-content-center">
                <Col>
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
              {projectArrayState.projects.length > 0 && (
                <Overview projectArray={projectArrayState} />
              )}
              <TaskCalendar />
            </Row>
          }
          rightElements={
            <>
              <Row className="p-2 pb-4 gap-2 justify-content-center bg-white border rounded-2">
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
                  <p className=" text-center">
                    <span
                      onClick={showAddProjectModal}
                      className={utilStyles.underlineAction}
                    >
                      Create a project
                    </span>{" "}
                    to get started!
                  </p>
                )}
                {renderedProjects}
              </Row>
            </>
          }
        />
        <AddProjectModal
          showState={showState}
          onHide={hideAddProjectModal}
          onActionButtonClick={addProjectToProjectArray}
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
