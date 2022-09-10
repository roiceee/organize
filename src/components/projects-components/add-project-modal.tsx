import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {
  ChangeEvent,
  useCallback,
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
import ModalWrapper from "../util-components/modal-wrapper";
import FormLengthCounter from "../util-components/form-length-counter";
import createProjectObject from "../../defaults/default-project";

interface AddProjectModalProps {
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  projectArrayState: ProjectArrayInterface;
  onAddProjectButtonClick: (newProject: ProjectInterface) => void;
}

function AddProjectModal({
  show,
  setModalShow,
  projectArrayState,
  onAddProjectButtonClick,
}: AddProjectModalProps) {
  const [currentProjectValue, setCurrentProjectValue] =
    useState<ProjectInterface>(createProjectObject());

  const titleForm = useRef<HTMLInputElement>(null);

  const resetProjectValues = useCallback(() => {
    setCurrentProjectValue(createProjectObject());
  }, []);

  const areFormsValid = useCallback((): boolean => {
    return (
      validateRequiredInput(titleForm, "form-title-error") &&
      validateExistingProject(titleForm, "form-title-error", projectArrayState)
    );
  }, [titleForm, projectArrayState]);

  const addProjectButtonHandler = useCallback(() => {
    if (!areFormsValid()) {
      return;
    }
    const currentProjectValueCopy = {...currentProjectValue}
    const newProjectValue = {
      ...currentProjectValueCopy,
      dateCreated: new Date(),
      lastModified: new Date(),
    }
    onAddProjectButtonClick(newProjectValue);
     
    resetProjectValues();
  }, [
    areFormsValid,
    onAddProjectButtonClick,
    resetProjectValues,
    currentProjectValue
  ]);

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
    removeErrorFields(titleForm, "form-title-error");
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
            <div id="form-title-error" className="error my-1"></div>
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
        <Button variant="secondary" onClick={addProjectButtonHandler}>
          Add Project
        </Button>
      }
    />
  );
}

export default AddProjectModal;
