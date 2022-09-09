import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import HeadWrapper from "../src/components/head-wrapper";
import AddProjectModal from "../src/components/projects-components/add-project-modal";
import NoProjectCard from "../src/components/projects-components/no-project-card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import UserTypeContext from "../src/contexts/user-context";
import ProjectCard from "../src/components/projects-components/project-card";
import ProjectArrayInterface from "../src/interfaces/project-array-interface";
import { retrieveFromLocalStorage } from "../src/utils/local-storage-util";
import LoadingNotice from "../src/components/util-components/loading-notice";

const Home: NextPage = () => {
  const [show, setModalShow] = useState<boolean>(false);

  const { userTypeState, setUserStateType } = useContext(UserTypeContext);

  const [projectArrayState, setProjectArrayState] =
    useState<ProjectArrayInterface>();

  const renderedProjects = useMemo((): Array<JSX.Element> | JSX.Element => {
    if (projectArrayState === undefined) {
      return <></>;
    }
    const projectCards = projectArrayState.projects.map((project) => {
      return <ProjectCard key={project.id} project={project} />;
    });
    return projectCards;
  }, [projectArrayState]);

  useEffect(() => {
    if (!userTypeState.isLoggedIn) {
      const projects = retrieveFromLocalStorage();
      setProjectArrayState(projects);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!projectArrayState) {
    return <LoadingNotice />;
  }
  
  return (
    <Container>
      <HeadWrapper title="Organize | Home" />
      <Row className="px-3 gap-2">
        <>
          {projectArrayState.projects.length === 0 && <NoProjectCard />}
          {projectArrayState.projects.length > 0 && <h3 className="my-0">Projects</h3>}
          <div>
            <Button
              className="mx-auto"
              variant="action"
              onClick={() => setModalShow(true)}
            >
              Add new Project
            </Button>
          </div>
          {renderedProjects}
        </>
      </Row>
      <AddProjectModal
        show={show}
        setModalShow={setModalShow}
        projectArrayState={projectArrayState}
        setProjectArrayState={setProjectArrayState}
        userTypeState={userTypeState}
      />
    </Container>
  );
};

export default Home;
