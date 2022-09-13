import styles from "../../styles/modules/tasks-page.module.scss";


interface ProjectControlProps {
  showProjectDetailsModal: () => void;
}

function ProjectControl({showProjectDetailsModal}: ProjectControlProps) {

  return (
    <>
    <div className="d-flex gap-3">
      <div className={`${styles.smallerFontSize} d-flex gap-3`}>
        <div className={styles.seeProjectDetails} tabIndex={0} onClick={showProjectDetailsModal}>
          See Project Details
        </div>
        <div>|</div>
        <div className={styles.editProject} tabIndex={0}>
          Edit
        </div>
        <div>|</div>
        <div className={styles.deleteProject} tabIndex={0}>
          Delete
        </div>
      </div>
    </div>
  
    </>
  );
}

export default ProjectControl;
