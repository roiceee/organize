import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {
  ChangeEvent,
  MutableRefObject,
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
import createProjectObject from "../../defaults/default-project";

interface AddProjectModalProps {
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  projectArrayState: ProjectArrayInterface;
  setProjectArrayState: React.Dispatch<
    React.SetStateAction<ProjectArrayInterface>
  >;
  userTypeState: UserTypeInterface;
  isMounted: MutableRefObject<boolean>;
}

function AddProjectModal({
  show,
  setModalShow,
  projectArrayState,
  setProjectArrayState,
  userTypeState,
  isMounted,
}: AddProjectModalProps) {
  const [currentProjectValue, setCurrentProjectValue] =
    useState<ProjectInterface>(createProjectObject());

  const titleForm = useRef<HTMLInputElement>(null);

  //this saves the project array to localStorage and reset values
  const saveToStorage = useCallback(
    (projectArrayState: ProjectArrayInterface) => {
      if (!userTypeState.isLoggedIn) {
        saveToLocalStorage(projectArrayState);
      }
    },
    [userTypeState.isLoggedIn]
  );

  const resetProjectValues = useCallback(() => {
    setCurrentProjectValue(createProjectObject());
  }, []);

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
    setProjectArrayState((prevProjectArrayState) => {
      const newProjectState = {
        ...prevProjectArrayState,
        projects: [...prevProjectArrayState.projects, currentProjectValue],
      };
      saveToStorage(newProjectState);
      resetProjectValues();
      return newProjectState;
    });

    setModalShow(false);
  }, [
    setModalShow,
    areFormsValid,
    currentProjectValue,
    setProjectArrayState,
    saveToStorage,
    resetProjectValues,
  ]);
  //this returns a new date on modal render
  useEffect(() => {
    setCurrentProjectValue((prevProjectValue) => ({
      ...prevProjectValue,
      dateCreated: new Date(),
      lastModified: new Date(),
    }));
  }, [currentProjectValue.title]);

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