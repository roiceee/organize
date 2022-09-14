import Button from "react-bootstrap/Button";
import React, { ChangeEvent, useCallback, useContext, useRef, useState } from "react";
import ProjectInterface from "../../interfaces/project-interface";
import {
  removeErrorFields,
  validateExistingProject,
  validateExistingProjectExceptForCurrent,
  validateRequiredInput,
} from "../../utils/validation";
import ModalWrapper from "../util-components/modal-wrapper";
import createcurrentProjectState from "../../defaults/default-project";
import ProjectForm from "./project-form";
import ProjectContext from "../../contexts/project-context";
import ProjectArrayContext from "../../contexts/project-array-context";
import ProjectArrayInterface from "../../interfaces/project-array-interface";

interface ProjectModalProps {
  showState: boolean;
  onHide: () => void;
  onActionButtonClick: (newProject: ProjectInterface) => void;
  modalTitle: string;
  mode: string;
}

function ProjectModal({
  showState,
  onHide,
  onActionButtonClick,
  modalTitle,
  mode,
}: ProjectModalProps) {

  const {currentProjectState, setCurrentProjectState} = useContext(ProjectContext);
  const {projectArrayState, setProjectArrayState} = useContext(ProjectArrayContext);
  const titleForm = useRef<HTMLInputElement>(null);

  const resetProjectValues = useCallback(() => {
    setCurrentProjectState(createcurrentProjectState());
  }, [setCurrentProjectState]);

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
        currentProjectState
      )
    );
  }, [currentProjectState, projectArrayState]);

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
  }, [mode, validateAddProject, validateEditProject]);

  const createNewProject = useCallback((): ProjectInterface => {
    const currentProjectValueCopy = { ...currentProjectState };
    const newProjectValue = {
      ...currentProjectValueCopy,
      dateCreated: new Date(),
      lastModified: new Date(),
    };
    return newProjectValue;
  }, [currentProjectState]);

  const updateCurrentProject = useCallback((): ProjectInterface => {
    const currentProjectValueCopy = {
      ...currentProjectState,
      tasks: [...currentProjectState.tasks],
    };
    const updatedProjectValue = {
      ...currentProjectValueCopy,
      tasks: [...currentProjectValueCopy.tasks],
      lastModified: new Date(),
    };
    
    return updatedProjectValue;
  }, [currentProjectState]);

  const actionButtonHandler = useCallback(() => {
    if (!areFormsValid()) {
      return;
    }

    let projectValue: ProjectInterface | null = null;
    switch (mode) {
      case "add":
        projectValue = createNewProject();
        resetProjectValues();
        break;
      case "edit":
        projectValue = updateCurrentProject();
    }
    if (projectValue === null) {
      return;
    }
    onActionButtonClick(projectValue);
  }, [
    areFormsValid,
    onActionButtonClick,
    resetProjectValues,
    createNewProject,
    updateCurrentProject,
    mode,
  ]);

  const projectTitleFormHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      switch (mode) {
        case "add":
          setCurrentProjectState((prevProjectValue) => ({
            ...prevProjectValue,
            id: value,
            title: value,
          }));
          break;
        case "edit":
          setCurrentProjectState((prevProjectValue) => ({
            ...prevProjectValue,
            title: value,
          }));
      }
    },
    [setCurrentProjectState, mode]
  );

  const projectDescriptionFormHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      setCurrentProjectState((prevProjectValue) => ({
        ...prevProjectValue,
        description: value,
      }));
    },
    [setCurrentProjectState]
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
