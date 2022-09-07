import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ProjectArrayContext from "../../contexts/project-array-context";
import ProjectInterface from "../../interfaces/project-interface";
import {
  removeErrorFields,
  validateRequiredInput,
} from "../../utils/validation";

interface AddProjectModalProps {
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddProjectModal({ show, setModalShow }: AddProjectModalProps) {
  const { projectArrayState, setProjectArrayState } =
    useContext(ProjectArrayContext);

  const [currentProjectValue, setCurrentProjectValue] =
    useState<ProjectInterface>({
      title: "",
      description: "",
      dateCreated: undefined,
      lastModified: undefined,
      tasks: [],
    });

  const titleForm = useRef<HTMLInputElement>(null);

  const areFormsValid = useCallback((): boolean => {
    return validateRequiredInput(titleForm, "title-error");
  }, [titleForm]);

  const addButtonHandler = useCallback((): void => {
    if (!areFormsValid()) {
      return;
    }

    setCurrentProjectValue((prevProjectValue) => ({
      ...prevProjectValue,
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
    setProjectArrayState((prevProjectArrayState) => ({
      ...prevProjectArrayState,
      projects: [...prevProjectArrayState.projects, currentProjectValue],
    }));
    setCurrentProjectValue({
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
  ]);

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
        <Form>
          <Form.Group>
            <Form.Control
              id="title"
              type="text"
              placeholder="Project name"
              onChange={currentProjectValueHandler}
              onFocus={titleOnFocusHandler}
              value={currentProjectValue.title}
              ref={titleForm}
            />
            <div id="title-error" className="error my-1"></div>
          </Form.Group>
          <Form.Control
            id="description"
            as="textarea"
            placeholder="Project Description (Optional)"
            onChange={currentProjectValueHandler}
            style={{ height: "100px" }}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addButtonHandler}>Add Project</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProjectModal;
