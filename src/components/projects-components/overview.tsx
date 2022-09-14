import ProjectArrayInterface from "../../interfaces/project-array-interface";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import styles from "../../styles/modules/util-styles.module.scss"
interface OverviewProps {
  projectArray: ProjectArrayInterface;
}

function Overview({ projectArray }: OverviewProps) {
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="right"
        overlay={
          <Popover id="popover-overview">
            <Popover.Header as="h3">Overview</Popover.Header>
            <Popover.Body>
              <div>Projects: {projectArray.projects.length}</div>
              <div>
                Total tasks:{" "}
                {projectArray.projects.reduce((prev, project) => {
                  return prev + project.tasks.length;
                }, 0)}
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <span style={{width: "fit-content"}} className={`${styles.underlineAction} my-2`}>See overview &gt;</span>
      </OverlayTrigger>
    </>
  );
}

export default Overview;
