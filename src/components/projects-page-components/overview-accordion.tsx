import { useCallback } from "react";
import Accordion from "react-bootstrap/Accordion";
import ProjectArrayInterface from "../../interfaces/project-array-interface";
interface OverviewProps {
  projectArray: ProjectArrayInterface;
}

function Overview({ projectArray }: OverviewProps) {
  const getTotalProjects = useCallback(() => {
    return projectArray.projects.reduce((acc, project) => {
      return acc + project.tasks.length;
    }, 0);
  }, [projectArray.projects]);

  const getPendingTasks = useCallback(() => {
    return projectArray.projects.reduce((acc, project) => {
      return (
        acc +
        project.tasks.reduce((acc, task) => {
          if (task.isDone) {
            return acc + 0;
          }
          return acc + 1;
        }, 0)
      );
    }, 0);
  }, [projectArray.projects]);

  return (
    <>
      <Accordion className="mb-1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Show Overview</Accordion.Header>
          <Accordion.Body>
            <div>
              Projects: {projectArray.projects.length}
            </div>
            <hr className="my-1" />
            <div>
              Total tasks: {getTotalProjects()}
            </div>
            <div style={{ fontSize: "0.9rem" }}>
              Total Pending tasks: {getPendingTasks()}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Overview;
