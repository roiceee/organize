import Button from "react-bootstrap/Button";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import ProjectInterface from "../../interfaces/project-interface";
import {
  removeErrorFields,
  validateExistingProject,
  validateExistingProjectExceptForCurrent,
  validateRequiredInput,
} from "../../../src/utils/validation";
import ProjectArrayInterface from "../../interfaces/project-array-interface";
import ModalWrapper from "../util-components/modal-wrapper";
import createProjectObject from "../../defaults/default-project";
import ProjectForm from "./project-form";

interface ProjectModalProps {
  projectObject: ProjectInterface;
  showState: boolean;
  onHide: () => void;
  projectArrayState: ProjectArrayInterface;
  onActionButtonClick: (newProject: ProjectInterface) => void;
  modalTitle: string;
  mode: string;
}

function ProjectModal({
  showState,
  onHide,
  projectArrayState,
  onActionButtonClick,
  projectObject,
  modalTitle,
  mode,
}: ProjectModalProps) {
  const [currentProjectValue, setCurrentProjectValue] =
    useState<ProjectInterface>(projectObject);

  const titleForm = useRef<HTMLInputElement>(null);

  const resetProjectValues = useCallback(() => {
    setCurrentProjectValue(createProjectObject());
  }, []);

  const validateAddProject = useCallback((): boolean => {
    return (
      validateRequiredInput(titleForm, "form-title-error") &&
      validateExistingProject(titleForm, "form-title-error", projectArrayState)
    );
  }, [projectArrayState]);

  const validateEditProject = useCallback((): boolean => {
    return (
      validateRequiredInput(titleForm, "form-title-error") &&
      validateExistingProjectExceptForCurrent(
        titleForm,
        "form-title-error",
        projectArrayState,
        currentProjectValue
      )
    );
  }, [currentProjectValue, projectArrayState]);

  const areFormsValid = useCallback((): boolean => {
    switch (mode) {
      case "add": {
        validateAddProject();
      }
      case "edit": {
        return validateEditProject();
      }
    }
    return false;
  }, [
    mode,
    validateAddProject,
    validateEditProject,
  ]);

  const actionButtonHandler = useCallback(() => {
    if (!areFormsValid()) {
      return;
    }
    const currentProjectValueCopy = { ...currentProjectValue };
    const newProjectValue = {
      ...currentProjectValueCopy,
      dateCreated: new Date(),
      lastModified: new Date(),
    };
    onActionButtonClick(newProjectValue);

    resetProjectValues();
  }, [
    areFormsValid,
    onActionButtonClick,
    resetProjectValues,
    currentProjectValue,
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
      showState={showState}
      onHide={onHide}
      modalTitle={modalTitle}
      bodyChildren={
        <ProjectForm
          titleFormRef={titleForm}
          currentProjectValue={currentProjectValue}
          projectTitleFormHandler={projectTitleFormHandler}
          titleOnFocusHandler={titleOnFocusHandler}
          projectDescriptionFormHandler={projectDescriptionFormHandler}
        />
      }
      footerChildren={
        <Button variant="secondary" onClick={actionButtonHandler}>
          Confirm
        </Button>
      }
    />
  );
}

export default ProjectModal;
