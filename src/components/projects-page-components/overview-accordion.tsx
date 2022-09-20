import Accordion from "react-bootstrap/Accordion";
import ProjectArrayInterface from "../../interfaces/project-array-interface";
interface OverviewProps {
  projectArray: ProjectArrayInterface;
}

function Overview({ projectArray }: OverviewProps) {
  return (
    <>
      <Accordion className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Show Overview</Accordion.Header>
          <Accordion.Body>
            <div>Projects: {projectArray.projects.length}</div>
            <div>
              Total tasks:{" "}
              {projectArray.projects.reduce((prev, project) => {
                return prev + project.tasks.length;
              }, 0)}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Overview;
