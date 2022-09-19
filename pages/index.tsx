import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import HeadWrapper from "../src/components/head-wrapper";
import AddProjectModal from "../src/components/projects-page-components/add-project-modal";
import NoProjectCard from "../src/components/projects-page-components/no-project-card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import UserTypeContext from "../src/contexts/user-context";
import ProjectCard from "../src/components/projects-page-components/project-card";
import ProjectInterface from "../src/interfaces/project-interface";
import { saveToStorage } from "../src/utils/local-storage-util";
import Col from "react-bootstrap/Col";
import createProjectObject from "../src/defaults/default-project";
import Quotes from "../src/components/projects-page-components/quotes";
import Overview from "../src/components/projects-page-components/overview-accordion";
import BodyLayoutOne from "../src/components/body-layout-one";
import StickyHeader from "../src/components/util-components/sticky-header";
import ProjectArrayContext from "../src/contexts/project-array-context";
import ProjectContext from "../src/contexts/project-context";
import utilStyles from "../src/styles/modules/util-styles.module.scss";
import ScrollToTopButton from "../src/components/util-components/scroll-to-top-button";
import UndoProjectAlert from "../src/components/util-components/undo-project-alert";
import ProjectArrayInterface from "../src/interfaces/project-array-interface";
import UndoDeletedProjectContext from "../src/contexts/undo-deleted-project-context";

const Home: NextPage = () => {
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const { projectArrayState, setProjectArrayState } =
    useContext(ProjectArrayContext);
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>(createProjectObject());
  const [showState, setModalShow] = useState<boolean>(false);
  const {undoDeletedProjectAlertState, setUndoDeletedProjectAlertState} = useContext(UndoDeletedProjectContext);

  const showAddProjectModal = useCallback(() => {
    setModalShow(true);
  }, []);

  const hideAddProjectModal = useCallback(() => {
    setModalShow(false);
  }, []);

  const hideUndoDeletedProjectAlert = useCallback(() => {
    setUndoDeletedProjectAlertState(false);
  }, [setUndoDeletedProjectAlertState])

  const renderedProjects = useMemo((): Array<JSX.Element> | JSX.Element => {
    if (projectArrayState === undefined) {
      return <></>;
    }
    const projectCards = projectArrayState.projects.map((project) => {
      return <ProjectCard key={project.id} project={project} />;
    });
    return projectCards;
  }, [projectArrayState]);

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
          deletedProjects: prevProjectArrayState.deletedProjects.filter((project) => {
            return projectToBeRestored.id !== project.id;
          }),
        };
        saveToStorage(userTypeState, projectArrayState)
        return newProjectArrayState;
      });
    },
    [projectArrayState, userTypeState, setProjectArrayState]
  );

  return (
    <ProjectContext.Provider
      value={{ currentProjectState, setCurrentProjectState }}
    >
      <Container>
        <HeadWrapper title="Organize | Home" />

        <BodyLayoutOne
          leftElements={
            <Row className="sticky-wrapper position-sticky sticky-top bg-light py-3 ">
              <Row className="mx-auto justify-content-center">
                <Col>
                  <h5 className="my-0 mb-2">Welcome back, User!</h5>
                </Col>
                <hr />
                <Quotes />
                <hr />
              </Row>
              {projectArrayState.projects.length === 0 && <NoProjectCard />}
              {projectArrayState.projects.length > 0 && (
                <Overview projectArray={projectArrayState} />
              )}
              <div className="text-center">
                <Button
                  className="mx-auto w-75"
                  variant="action"
                  onClick={showAddProjectModal}
                >
                  Add new Project
                </Button>
              </div>
            </Row>
          }
          rightElements={
            <>
              <Row className="px-2 gap-2 justify-content-center pt-2">
                <StickyHeader
                  title="Projects"
                  counter={projectArrayState.projects.length}
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
        {projectArrayState.deletedProjects.length > 0 && (
                <>
                  <UndoProjectAlert
                    project={
                      projectArrayState.deletedProjects[
                        projectArrayState.deletedProjects.length - 1
                      ]
                    }
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
