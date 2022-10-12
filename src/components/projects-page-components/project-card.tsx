import Link from "next/link";
import Container from "react-bootstrap/Container";
import dateSVG from "../../images/calendar.svg";
import taskSVG from "../../images/paper.svg";
import ProjectInterface from "../../interfaces/project-interface";
import styles from "../../styles/modules/project-card.module.scss";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import formatDate from "../../utils/dateFormatter";
import CardDetailRow from "../util-components/card-detail-row";

interface ProjectCardProps {
  project: ProjectInterface;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div
        className={`${styles.cardWrapper} ${styles.rounded} ${utilStyles.hoverable} bg-white px-0 border border-2`}
        tabIndex={0}
        style={{
          maxWidth: "400px",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        <div className="p-1">
          <h3 className="my-0 mb-2">{project.title}</h3>
          <div style={{ fontSize: "0.9rem" }}>
            <CardDetailRow
              label="Tasks"
              valueSpan={<span>{project.tasks.length}</span>}
              svg={taskSVG}
            />
            <CardDetailRow
              label="Last Modified"
              valueSpan={<span>{formatDate(project.lastModified)}</span>}
              svg={dateSVG}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
