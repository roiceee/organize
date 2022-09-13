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

const Home: NextPage = () => {
  const [show, setModalShow] = useState<boolean>(false);
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const [projectArrayState, setProjectArrayState] =
    useState<ProjectArrayInterface>(createProjectArrayObject());

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
        const newProjectState = {
          ...prevProjectArrayState,
          projects: [...prevProjectArrayState.projects, newProject],
        };
        saveToStorage(userTypeState, newProjectState);

        return newProjectState;
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
      <Row className="sticky-wrapper position-sticky sticky-top bg-light py-3">
        {projectArrayState.projects.length === 0 && <NoProjectCard />}
        {projectArrayState.projects.length > 0 && (
          <h3 className="my-0 mb-2">Projects</h3>
        )}
        <div>
          <Button
            className="mx-auto"
            variant="action"
            onClick={() => setModalShow(true)}
          >
            Add new Project
          </Button>
        </div>
      </Row>
      <Row className="px-2 gap-2 justify-content-center">
        {renderedProjects}
      </Row>
      <AddProjectModal
        show={show}
        setModalShow={setModalShow}
        projectArrayState={projectArrayState}
        onAddProjectButtonClick={addProjectToProjectArray}
      />
    </Container>
  );
};

export default Home;
