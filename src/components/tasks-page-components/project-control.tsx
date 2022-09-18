import styles from "../../styles/modules/tasks-page.module.scss";

interface ProjectControlProps {
  editProjectHandler: () => void;
  deleteProjectHandler: () => void;
}

function ProjectControl({
  editProjectHandler,
  deleteProjectHandler,
}: ProjectControlProps) {
  return (
    <>
      <div className="d-flex gap-3">
        <div className={`${styles.smallerFontSize} d-flex gap-3`}>
          <div
            className={styles.editProject}
            tabIndex={0}
            onClick={editProjectHandler}
          >
            Edit
          </div>
          <div>|</div>
          <div
            className={styles.deleteProject}
            tabIndex={0}
            onClick={deleteProjectHandler}
          >
            Delete
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectControl;
