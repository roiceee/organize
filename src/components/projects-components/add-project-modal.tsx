import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ProjectInterface from "../../interfaces/project-interface";
import {
  removeErrorFields,
  validateExistingProject,
  validateRequiredInput,
} from "../../../src/utils/validation";
import ProjectConstraintsEnum from "../../enums/project-constraints";
import ProjectArrayInterface from "../../interfaces/project-array-interface";
import UserTypeInterface from "../../interfaces/user-interface"
import { saveToLocalStorage } from "../../utils/local-storage-util";

interface AddProjectModalProps {
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  projectArrayState: ProjectArrayInterface;
  setProjectArrayState: React.Dispatch<React.SetStateAction<ProjectArrayInterface | undefined>>;
  userTypeState: UserTypeInterface;
}

function AddProjectModal({ show, setModalShow, projectArrayState, setProjectArrayState, userTypeState }: AddProjectModalProps) {
  const [currentProjectValue, setCurrentProjectValue] =
    useState<ProjectInterface>({
      id: "",
      title: "",
      description: "",
      dateCreated: undefined,
      lastModified: undefined,
      tasks: [],
    });

  const titleForm = useRef<HTMLInputElement>(null);

  const areFormsValid = useCallback((): boolean => {
    return (
      validateRequiredInput(titleForm, "title-error") &&
      validateExistingProject(titleForm, "title-error", projectArrayState)
    );
  }, [titleForm, projectArrayState]);

  const addButtonHandler = useCallback((): void => {
    if (!areFormsValid()) {
      return;
    }

    setCurrentProjectValue((prevProjectValue) => ({
      ...prevProjectValue,
      id: prevProjectValue.title,
      dateCreated: new Date(),
      lastModified: new Date(),
    }));

    setModalShow(false);
  }, [setModalShow, areFormsValid]);

  //this adds the current project to the project array once the date is being loaded to the current project.]
  //also clears the current project
  useEffect(() => {
    if (currentProjectValue.dateCreated === undefined) {
      return;
    }
    if (setProjectArrayState === undefined) {
      return
    }
    setProjectArrayState((prevProjectArrayState) => ({
      ...prevProjectArrayState,
      projects: [...prevProjectArrayState!.projects, currentProjectValue],
    }));
    setCurrentProjectValue({
      id: "",
      title: "",
      description: "",
      dateCreated: undefined,
      lastModified: undefined,
      tasks: [],
    });
  }, [
    currentProjectValue.dateCreated,
    currentProjectValue,
    setProjectArrayState,
    userTypeState.isLoggedIn,
  ]);

  //this saves the project array to localStorage
  useEffect(() => {
    if (!userTypeState.isLoggedIn) {
      saveToLocalStorage(projectArrayState)
    }
  }, [projectArrayState, userTypeState.isLoggedIn])

  const currentProjectValueHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      const id = e.target.id;
      setCurrentProjectValue((prevProjectValue) => ({
        ...prevProjectValue,
        [id]: value,
      }));
    },
    [setCurrentProjectValue]
  );

  const titleOnFocusHandler = useCallback(() => {
    removeErrorFields(titleForm, "title-error");
  }, [titleForm]);

  return (
    <Modal
      show={show}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-primary text-light">
        <Modal.Title id="contained-modal-title-vcenter">
          Add Project
        </Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={() => setModalShow(false)}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group>
            <div className="d-flex justify-content-end">
              <span style={{ fontSize: "0.9rem" }}>
                {currentProjectValue.title.length}/
                {ProjectConstraintsEnum.TitleLength}
              </span>
            </div>
            <Form.Control
              id="title"
              type="text"
              placeholder="Project name"
              onChange={currentProjectValueHandler}
              onFocus={titleOnFocusHandler}
              value={currentProjectValue.title}
              ref={titleForm}
              maxLength={ProjectConstraintsEnum.TitleLength}
            />
            <div id="title-error" className="error my-1"></div>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <span style={{ fontSize: "0.9rem" }}>
              {currentProjectValue.description!.length}/
              {ProjectConstraintsEnum.DescriptionLength}
            </span>
          </div>
          <Form.Control
            id="description"
            as="textarea"
            placeholder="Project Description (Optional)"
            onChange={currentProjectValueHandler}
            style={{ height: "100px", resize: "none" }}
            maxLength={ProjectConstraintsEnum.DescriptionLength}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={addButtonHandler}>
          Add Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProjectModal;
