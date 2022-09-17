import ProjectInterface from "../../interfaces/project-interface";
import styles from "../../styles/modules/project-card.module.scss";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import formatDate from "../../utils/dateFormatter";
import Link from "next/link";
import Container from "react-bootstrap/Container";
interface ProjectCardProps {
  project: ProjectInterface;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Container
        className={`${styles.cardWrapper} ${styles.rounded} ${utilStyles.hoverable} bg-white px-0 border border-1`}
        tabIndex={0}
        style={{ maxWidth: "400px" }}
      >
        <div className="d-flex gap-1">
          <div className={styles.verticalLine}></div>
          <div className="p-1">
            <h4 className="my-0 mb-2">{project.title}</h4>
            <div style={{ fontSize: "0.9rem" }}>
              <div>
                <b>Tasks:</b> {project.tasks.length}
              </div>
              <div>
                <b>Last Modified:</b> {formatDate(project.lastModified)}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Link>
  );
}

export default ProjectCard;
