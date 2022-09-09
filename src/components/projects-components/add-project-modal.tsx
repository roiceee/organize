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
import UserTypeInterface from "../../interfaces/user-interface";
import { saveToLocalStorage } from "../../utils/local-storage-util";
import ModalWrapper from "../util-components/modal-wrapper";
import FormLengthCounter from "../util-components/form-length-counter";
import TaskInterface from "../../interfaces/task-interface";

interface AddProjectModalProps {
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  projectArrayState: ProjectArrayInterface;
  setProjectArrayState: React.Dispatch<
    React.SetStateAction<ProjectArrayInterface | undefined>
  >;
  userTypeState: UserTypeInterface;
}

function AddProjectModal({
  show,
  setModalShow,
  projectArrayState,
  setProjectArrayState,
  userTypeState,
}: AddProjectModalProps) {
  const [currentProjectValue, setCurrentProjectValue] =
    useState<ProjectInterface>({
      id: "",
      title: "",
      description: "",
      dateCreated: "",
      lastModified: "",
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
    setProjectArrayState((prevProjectArrayState) => ({
      ...prevProjectArrayState,
      projects: [...prevProjectArrayState!.projects, currentProjectValue],
    }));

    setModalShow(false);
  }, [setModalShow, areFormsValid, currentProjectValue, setProjectArrayState]);

  const resetProjectValues = useCallback(() => {
    setCurrentProjectValue({
      id: "",
      title: "",
      description: "",
      dateCreated: "",
      lastModified: "",
      tasks: [],
    });
  }, []);

  //this saves the project array to localStorage and reset values
  useEffect(() => {
    if (!userTypeState.isLoggedIn) {
      saveToLocalStorage(projectArrayState);
    }
    return () => resetProjectValues();
  }, [projectArrayState, userTypeState, resetProjectValues]);

  //this returns a new date everytime this component rerenders
  useEffect(() => {
    setCurrentProjectValue((prevProjectValue) => ({
      ...prevProjectValue,
      dateCreated: new Date(),
      lastModified: new Date(),
    }));
  }, [setCurrentProjectValue]);

  const projectTitleFormHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      setCurrentProjectValue((prevProjectValue) => ({
        ...prevProjectValue,
        id: value,
        title: value,
      }));
    },
    [setCurrentProjectValue]
  );

  const projectDescriptionFormHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      setCurrentProjectValue((prevProjectValue) => ({
        ...prevProjectValue,
        description: value,
      }));
    },
    [setCurrentProjectValue]
  );

  const titleOnFocusHandler = useCallback(() => {
    removeErrorFields(titleForm, "title-error");
  }, [titleForm]);

  return (
    <ModalWrapper
      show={show}
      setModalShow={setModalShow}
      modalTitle="Add Project"
      bodyChildren={
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group>
            <div className="d-flex justify-content-end">
              <FormLengthCounter
                currentValue={currentProjectValue.title.length}
                maxValue={ProjectConstraintsEnum.TitleLength}
              />
            </div>
            <Form.Control
              id="title"
              type="text"
              placeholder="Project name"
              onChange={projectTitleFormHandler}
              onFocus={titleOnFocusHandler}
              value={currentProjectValue.title}
              ref={titleForm}
              maxLength={ProjectConstraintsEnum.TitleLength}
            />
            <div id="title-error" className="error my-1"></div>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <FormLengthCounter
              currentValue={currentProjectValue.description!.length}
              maxValue={ProjectConstraintsEnum.DescriptionLength}
            />
          </div>
          <Form.Control
            id="description"
            as="textarea"
            placeholder="Project Description (Optional)"
            onChange={projectDescriptionFormHandler}
            style={{ height: "100px", resize: "none" }}
            maxLength={ProjectConstraintsEnum.DescriptionLength}
          />
        </Form>
      }
      footerChildren={
        <Button variant="secondary" onClick={addButtonHandler}>
          Add Project
        </Button>
      }
    />
  );
}

export default AddProjectModal;
