import type { NextPage } from "next";
import { useCallback, useContext, useState } from "react";
import HeadWrapper from "../components/head-wrapper";
import AddProjectModal from "../components/projects-components/add-project-modal";
import NoProjectCard from "../components/projects-components/no-project-card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ProjectArrayContext from "../contexts/project-array-context";

const Home: NextPage = () => {
  const [show, setModalShow] = useState<boolean>(false);

  const {projectArrayState, setProjectArrayState} = useContext(ProjectArrayContext)


  const addNewProjectButtonHandler = useCallback(
    () => setModalShow(true),
    [setModalShow]
  );

  return (
    <Container>
      <HeadWrapper title="Organize | Home" />
      {projectArrayState.projects.length === 0 && <NoProjectCard />}
      <Row>
      <Button
        className="mx-auto"
        variant="action"
        style={{ width: "280px" }}
        onClick={addNewProjectButtonHandler}
      >
        Add a new Project
      </Button>
      </Row>
      <AddProjectModal show={show} setModalShow={setModalShow} />
    </Container>
  );
};

export default Home;
