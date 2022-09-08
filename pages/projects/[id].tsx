import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ProjectArrayContext from "../../src/contexts/project-array-context";
import ProjectInterface from "../../src/interfaces/project-interface";
import Spinner from "react-bootstrap/Spinner";
import formatDate from "../../src/utils/dateFormatter";
import Link from "next/link";

function TasksPage() {
  const router = useRouter();
  const { projectArrayState, setProjectArrayState } =
    useContext(ProjectArrayContext);
  const [currentProjectState, setCurrentProjectState] =
    useState<ProjectInterface>();

  useEffect(() => {
    const matchedProject = projectArrayState.projects.find((project) => {
      return project.id === router.query.id;
    });
    setCurrentProjectState(matchedProject);
  }, [projectArrayState.projects, router.query.id]);

  if (!currentProjectState) {
    return (
      <div
        className="position-fixed w-100 text-center"
        style={{ width: "100vw" }}
      >
        <Spinner animation="grow" />
        <p>
          Oops! Something went wrong. <Link href="/">Go back.</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* {projectArrayState.projects} */}
      <h3>{currentProjectState.title}</h3>
      <div>{formatDate(currentProjectState.lastModified)}</div>
    </div>
  );
}

export default TasksPage;
