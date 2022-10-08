import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Button from "react-bootstrap/Button";
import { useContext, useCallback, useMemo, useState } from "react";
import ProjectArrayContext from "../../contexts/project-array-context";
import { checkTaskIsDue } from "../../utils/task-utils";
import Table from "react-bootstrap/Table";
import ClearDataModal from "./clear-data-modal";
import createProjectArrayObject from "../../defaults/default-project-array-";
import { saveToStorage } from "../../utils/storage";
import UserTypeContext from "../../contexts/user-context";

enum OverviewModalModes {
  View,
  ClearData,
}
interface OverviewModalProps {
  show: boolean;
  onHide: () => void;
  clearDataHandler: () => void;
}

function OverviewModal({ show, onHide, clearDataHandler }: OverviewModalProps) {
  const { projectArrayState } =
    useContext(ProjectArrayContext);
  const { userTypeState } = useContext(UserTypeContext);
  const [modalModeState, setModalModeState] = useState<OverviewModalModes>(
    OverviewModalModes.View
  );

  const setToViewMode = useCallback(() => {
    setModalModeState(OverviewModalModes.View);
  }, [])

  const setToClearMode = useCallback(() => {
    setModalModeState(OverviewModalModes.ClearData);
  }, [])

  const modalHideHandler = useCallback(() => {
    onHide();
    setTimeout(() => {
      setToViewMode();
    }, 500);
  }, [onHide, setToViewMode])


  const totalTasks = useMemo(() => {
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
    <>
      {modalModeState === OverviewModalModes.View && (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="bg-primary text-white">
            <Modal.Title id="contained-modal-title-vcenter">
              Overview
            </Modal.Title>
            <CloseButton onClick={onHide} variant="white" />
          </Modal.Header>
          <Modal.Body>
            <Table bordered striped="columns">
              <tbody>
                <tr>
                  <td className="col col-10">
                    <b>Projects</b>
                  </td>
                  <td>
                    <b>{projectArrayState.projects.length}</b>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table bordered striped="columns">
              <tbody>
                <tr>
                  <td className="col col-10">
                    <b>Total Tasks</b>
                  </td>
                  <td>
                    <b>{totalTasks}</b>
                  </td>
                </tr>

                <tr>
                  <td>Pending</td>
                  <td>{pendingTasks}</td>
                </tr>
                <tr>
                  <td>
                    Due{" "}
                    <span style={{ fontSize: "0.8rem" }}>
                      (Not all pending tasks are due)
                    </span>
                  </td>
                  <td>{dueTasks}</td>
                </tr>
              </tbody>
            </Table>
            <div className="text-center">
              <Button variant="outline-danger" style={{ width: "200px" }} onClick={setToClearMode}>
                Clear Data
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
      {modalModeState === OverviewModalModes.ClearData && (
        <ClearDataModal
          show={show}
          onHide={modalHideHandler}
          clearDataHandler={clearDataHandler}
        />
      )}
    </>
  );
}

export default OverviewModal;
