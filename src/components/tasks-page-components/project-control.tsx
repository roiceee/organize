import Button from "react-bootstrap/Button";
interface ProjectControlProps {
  onEditProjectButtonClick: () => void;
  onClearProjectButtonClick: () => void;
  onDeleteProjectButtonClick: () => void;
}

function ProjectControl({
  onEditProjectButtonClick,
  onClearProjectButtonClick,
  onDeleteProjectButtonClick,
}: ProjectControlProps) {


  return (
    <>
      <div className={`d-flex flex-column text-center gap-1`}>
        <Button
          variant="outline-gray"
          tabIndex={0}
          onClick={onEditProjectButtonClick}
          style={{ fontSize: "0.9rem" }}
        >
          Edit Project
        </Button>
        <Button
          variant="outline-gray"
          tabIndex={0}
          onClick={onClearProjectButtonClick}
          style={{ fontSize: "0.9rem" }}
        >
          Clear Tasks
        </Button>
        <Button
          variant="outline-danger"
          tabIndex={0}
          onClick={onDeleteProjectButtonClick}
          style={{ fontSize: "0.9rem" }}
        >
          Delete Project
        </Button>
      </div>
    </>
  );
}

export default ProjectControl;
