import {
  ChangeEvent,
  useCallback,
  useContext,
  useRef,
  useState
} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProjectArrayContext from "../../contexts/project-array-context";
import ProjectContext from "../../contexts/project-context";
import ProjectInterface from "../../interfaces/project-interface";
import {
  removeErrorFields,
  validateExistingProjectExceptForCurrent,
  validateRequiredInput
} from "../../utils/validation";
import ProjectForm from "../projects-page-components/project-form";

interface AddProjectModalProps {
  showState: boolean;
  onHide: () => void;
  onActionButtonClick: (newProject: ProjectInterface) => void;
}

function EditProjectModal({
  showState,
  onHide,
  onActionButtonClick,
}: AddProjectModalProps) {
  const { currentProjectState } = useContext(ProjectContext);
  const { projectArrayState } = useContext(ProjectArrayContext);
  const [projectFormState, setProjectFormState] =
    useState<ProjectInterface>(currentProjectState);
  const titleForm = useRef<HTMLInputElement>(null);

  const areFormsValid = useCallback((): boolean => {
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

  const updateCurrentProject = useCallback((): ProjectInterface => {
    const currentProjectValueCopy = {
      ...projectFormState,
      tasks: [...projectFormState.tasks],
    };
    const updatedProjectValue = {
      ...currentProjectValueCopy,
      tasks: [...currentProjectValueCopy.tasks],
      lastModified: new Date(),
    };

    return updatedProjectValue;
  }, [projectFormState]);

  const actionButtonHandler = useCallback(() => {
    if (!areFormsValid()) {
      return;
    }
    const projectValue: ProjectInterface | null = updateCurrentProject();
    if (projectValue === null) {
      return;
    }
    onActionButtonClick(projectValue);
  }, [areFormsValid, onActionButtonClick, updateCurrentProject]);

  const projectTitleFormHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      setProjectFormState((prevProjectValue) => ({
        ...prevProjectValue,
        id: value,
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
    <Modal
      show={showState}
      onHide={onHide}
      size="lg"
      aria-labelledby="edit-project-modal"
      centered
    >
      <Modal.Header className="bg-secondary text-light" closeButton>
        <Modal.Title id="edit-project-modal">Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProjectForm
          projectFormState={projectFormState}
          titleFormRef={titleForm}
          projectTitleFormHandler={projectTitleFormHandler}
          titleOnFocusHandler={titleOnFocusHandler}
          projectDescriptionFormHandler={projectDescriptionFormHandler}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="action" onClick={actionButtonHandler}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProjectModal;
