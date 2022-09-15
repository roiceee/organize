import Form from "react-bootstrap/form";
import FormLengthCounter from "../util-components/form-length-counter";
import ProjectConstraintsEnum from "../../enums/project-constraints";
import ProjectInterface from "../../interfaces/project-interface";
import { ChangeEvent, useRef, useCallback, useContext } from "react";
import {removeErrorFields} from "../../utils/validation";
import ProjectContext from "../../contexts/project-context";

interface ProjectFormProps {
  projectFormState: ProjectInterface,
  projectTitleFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  titleOnFocusHandler: () => void;
  projectDescriptionFormHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  titleFormRef: React.RefObject<HTMLInputElement>
}

function ProjectForm({
  projectFormState,
  projectTitleFormHandler,
  projectDescriptionFormHandler,
  titleFormRef,
}: ProjectFormProps) {


  const titleOnFocusHandler = useCallback(() => {
    removeErrorFields(titleFormRef, "form-title-error");
  }, [titleFormRef]);
  

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group>
        <div className="d-flex justify-content-between">
        <div>Title</div>
          <FormLengthCounter
            currentValue={projectFormState.title.length}
            maxValue={ProjectConstraintsEnum.TitleLength}
          />
        </div>
        <Form.Control
          id="title"
          type="text"
          placeholder="Project title"
          onChange={projectTitleFormHandler}
          onFocus={titleOnFocusHandler}
          value={projectFormState.title}
          ref={titleFormRef}
          maxLength={ProjectConstraintsEnum.TitleLength}
        />
        <div id="form-title-error" className="error my-1"></div>
      </Form.Group>
      <div className="d-flex justify-content-between">
        <div>Description</div>
        <FormLengthCounter
          currentValue={projectFormState.description.length}
          maxValue={ProjectConstraintsEnum.DescriptionLength}
        />
      </div>
      <Form.Control
        id="description"
        as="textarea"
        placeholder="Project Description (Optional)"
        onChange={projectDescriptionFormHandler}
        value={projectFormState.description}
        style={{ height: "100px", resize: "none" }}
        maxLength={ProjectConstraintsEnum.DescriptionLength}
      />
    </Form>
  );
}

export default ProjectForm;
