import Link from "next/link";
import Container from "react-bootstrap/Container";
import ProjectInterface from "../../interfaces/project-interface";
import styles from "../../styles/modules/project-card.module.scss";
import utilStyles from "../../styles/modules/util-styles.module.scss";
import formatDate from "../../utils/dateFormatter";
interface ProjectCardProps {
  project: ProjectInterface;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Container
        className={`${styles.cardWrapper} ${styles.rounded} ${utilStyles.hoverable} bg-white px-0 border border-1`}
        tabIndex={0}
        style={{
          maxWidth: "400px",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        <div className="d-flex gap-1">
          <div className={styles.verticalLine}></div>
          <div className="p-1">
            <h4 className="my-0 mb-2">{project.title}</h4>
            <div style={{ fontSize: "0.9rem" }}>
              <div className="d-flex align-items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                  <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                </svg>
                <b>Tasks:</b> {project.tasks.length}
              </div>
              <div className="d-flex align-items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
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
