import ProjectInterface from "../../interfaces/project-interface";
import styles from "../../styles/modules/project-card.module.css";
import Card from "react-bootstrap/Card"
import formatDate from "../../../src/utils/dateFormatter";
import Link from "next/link"
interface ProjectCardProps {
  project: ProjectInterface;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
    <Card
      className={`${styles.cardWrapper} bg-white px-0 border border-2`}
      tabIndex={0}
      style={{maxWidth: "400px"}}
    >
    <Card.Header className="bg-secondary text-light">
    <h5 className="my-0">{project.title}</h5>
    </Card.Header>
    <Card.Body className="p-2">
      <div>Tasks: {project.tasks.length}</div>
      <div>Last Modified: {formatDate(project.lastModified)}</div>
    </Card.Body>
    </Card>
    </Link>
  );
}

export default ProjectCard;
