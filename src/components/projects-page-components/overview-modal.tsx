import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import { useContext, useCallback, useMemo } from "react";
import ProjectArrayContext from "../../contexts/project-array-context";
import { checkTaskIsDue } from "../../utils/task-utils";

interface OverviewModalProps {
  show: boolean;
  onHide: () => void;
}

function OverviewModal({ show, onHide }: OverviewModalProps) {
  const { projectArrayState } = useContext(ProjectArrayContext);
  
  const totalProjects = useMemo(() => {
    return projectArrayState.projects.reduce((acc, project) => {
      return acc + project.tasks.length;
    }, 0);
  }, [projectArrayState.projects]);

  const pendingTasks = useMemo(() => {
    return projectArrayState.projects.reduce((acc, project) => {
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
  }, [projectArrayState.projects]);

  const dueTasks = useMemo(() => {
    return projectArrayState.projects.reduce((acc, project) => {
      return (
        acc +
        project.tasks.reduce((acc, task) => {
          if (!checkTaskIsDue(task)) {
            return acc + 0;
          }
          return acc + 1;
        }, 0)
      );
    }, 0);
  }, [projectArrayState.projects]);
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-primary text-white">
        <Modal.Title id="contained-modal-title-vcenter">Overview</Modal.Title>
        <CloseButton onClick={onHide} variant="white" />
      </Modal.Header>

      <Modal.Body>
        <div><b>Projects: {projectArrayState.projects.length}</b></div>
        <hr className="my-1" />
        <div><b>Total tasks: {totalProjects}</b></div>
        <div style={{ fontSize: "0.9rem" }}>
          <div>Pending: {pendingTasks}</div>
          <div>Due: {dueTasks}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OverviewModal;
