import Button from "react-bootstrap/Button";
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import ProjectInterface from "../../interfaces/project-interface";
import {
  removeErrorFields,
  validateExistingProject,
  validateRequiredInput,
} from "../../utils/validation";
import ModalWrapper from "../util-components/modal-wrapper";
import createcurrentProjectState from "../../defaults/default-project";
import ProjectForm from "./project-form";
import ProjectArrayContext from "../../contexts/project-array-context";
import createProjectObject from "../../defaults/default-project";
import generateUniqueID from "../../utils/unique-id";

interface AddProjectModalProps {
  showState: boolean;
  onHide: () => void;
  onActionButtonClick: (newProject: ProjectInterface) => void;
}

function AddProjectModal({
  showState,
  onHide,
  onActionButtonClick,
}: AddProjectModalProps) {
  const { projectArrayState } = useContext(ProjectArrayContext);
  const [projectFormState, setProjectFormState] = useState<ProjectInterface>(
    createProjectObject()
  );
  const titleForm = useRef<HTMLInputElement>(null);

  const resetProjectValues = useCallback(() => {
    setProjectFormState(createcurrentProjectState());
  }, [setProjectFormState]);

  const areFormsValid = useCallback((): boolean => {
    return (
      validateRequiredInput(titleForm, "form-title-error") &&
      validateExistingProject(titleForm, "form-title-error", projectArrayState)
    );
  }, [projectArrayState]);

  const createNewProject = useCallback((): ProjectInterface => {
    const currentProjectValueCopy = { ...projectFormState };
    const newProjectValue = {
      ...currentProjectValueCopy,
      id: generateUniqueID(),
      dateCreated: new Date(),
      lastModified: new Date(),
    };
    return newProjectValue;
  }, [projectFormState]);

  const actionButtonHandler = useCallback(() => {
    if (!areFormsValid()) {
      return;
    }

    let projectValue: ProjectInterface | null = createNewProject();
    resetProjectValues();

    if (projectValue === null) {
      return;
    }
    onActionButtonClick(projectValue);
  }, [
    areFormsValid,
    onActionButtonClick,
    resetProjectValues,
    createNewProject,
  ]);

  const projectTitleFormHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;

      setProjectFormState((prevProjectValue) => ({
        ...prevProjectValue,
        title: value,
      }));
    },
    [setProjectFormState]
  );

  const projectDescriptionFormHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      setProjectFormState((prevProjectValue) => ({
        ...prevProjectValue,
        description: value,
      }));
    },
    [setProjectFormState]
  );

  const titleOnFocusHandler = useCallback(() => {
    removeErrorFields(titleForm, "form-title-error");
  }, [titleForm]);

  return (
    <ModalWrapper
      showState={showState}
      onHide={onHide}
      modalTitle="Add New Project"
      bodyChildren={
        <ProjectForm
          projectFormState={projectFormState}
          titleFormRef={titleForm}
          projectTitleFormHandler={projectTitleFormHandler}
          titleOnFocusHandler={titleOnFocusHandler}
          projectDescriptionFormHandler={projectDescriptionFormHandler}
        />
      }
      footerChildren={
        <Button variant="action" onClick={actionButtonHandler}>
          Confirm
        </Button>
      }
    />
  );
}

export default AddProjectModal;
