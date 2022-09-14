import type { NextPage } from "next";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import HeadWrapper from "../src/components/head-wrapper";
import AddProjectModal from "../src/components/projects-components/add-project-modal";
import NoProjectCard from "../src/components/projects-components/no-project-card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import UserTypeContext from "../src/contexts/user-context";
import ProjectCard from "../src/components/projects-components/project-card";
import ProjectArrayInterface from "../src/interfaces/project-array-interface";
import { retrieveFromStorage } from "../src/utils/local-storage-util";
import LoadingNotice from "../src/components/util-components/loading-notice";
import createProjectArrayObject from "../src/defaults/default-project-array-";
import ProjectInterface from "../src/interfaces/project-interface";
import { saveToStorage } from "../src/utils/local-storage-util";
import Col from "react-bootstrap/Col";
import createProjectObject from "../src/defaults/default-project";
import Quotes from "../src/components/projects-components/quotes";
import Overview from "../src/components/projects-components/overview";

const Home: NextPage = () => {
  const [showState, setModalShow] = useState<boolean>(false);
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const [projectArrayState, setProjectArrayState] =
    useState<ProjectArrayInterface>(createProjectArrayObject());

  const showAddProjectModal = useCallback(() => {
    setModalShow(true);
  }, []);

  const hideAddProjectModal = useCallback(() => {
    setModalShow(false);
  }, []);

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

  useEffect(() => {
    const projects = retrieveFromStorage(userTypeState);
    setProjectArrayState(projects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!projectArrayState) {
    return <LoadingNotice />;
  }

  return (
    <Container>
      <HeadWrapper title="Organize | Home" />
      <Row>
        <Col className="col-lg-5">
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
            <div>
              <Button
                className="mx-auto"
                variant="action"
                onClick={showAddProjectModal}
              >
                Add new Project
              </Button>
            </div>
          </Row>
        </Col>
        <Col>
          {projectArrayState.projects.length > 0 && (
            <Row className="px-2 gap-2 justify-content-center pt-2">
              <div className="position-sticky sticky-top bg-light py-3">
                <h6 className="text-center">
                  Projects
                </h6>
                <hr className="my-0 w-75 mx-auto"/>
              </div>
              {renderedProjects}
            </Row>
          )}
        </Col>
      </Row>
      <AddProjectModal
        projectObject={createProjectObject()}
        showState={showState}
        onHide={hideAddProjectModal}
        projectArrayState={projectArrayState}
        onAddProjectButtonClick={addProjectToProjectArray}
      />
    </Container>
  );
};

export default Home;
