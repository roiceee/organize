import ProjectArrayInterface from "../interfaces/project-array-interface";
import ProjectInterface from "../interfaces/project-interface";
import TaskInterface from "../interfaces/task-interface";

function validateRequiredInput(
  formElement: React.RefObject<HTMLInputElement>,
  errorTextElementID: string
): boolean {
  const element: HTMLInputElement | null = formElement.current;
  const errorTextElement: HTMLDivElement | null = document.querySelector(
    `#${errorTextElementID}`
  );

  if (element!.value.trim() === "") {
    element!.classList.add("invalid");
    errorTextElement!.textContent = "This field is required.";
    return false;
  }

  return true;
}

function validateExistingProject(
  formElement: React.RefObject<HTMLInputElement>,
  errorTextElementID: string,
  projectArray: ProjectArrayInterface
): boolean {
  const element: HTMLInputElement | null = formElement.current;
  const errorTextElement: HTMLDivElement | null = document.querySelector(
    `#${errorTextElementID}`
  );

  for (let i = 0; i < projectArray.projects.length; i++) {
    if (projectArray.projects[i].title === element?.value) {
      element.classList.add("invalid");
      errorTextElement!.textContent = "Project name exists.";
      return false;
    }
  }
  return true;
}

function validateExistingProjectExceptForCurrent(
  formElement: React.RefObject<HTMLInputElement>,
  errorTextElementID: string,
  projectArray: ProjectArrayInterface,
  currentProject: ProjectInterface
) {
  const element: HTMLInputElement | null = formElement.current;
  const errorTextElement: HTMLDivElement | null = document.querySelector(
    `#${errorTextElementID}`
  );

  for (let i = 0; i < projectArray.projects.length; i++) {
    if (currentProject.title === element?.value) {
      continue;
    }
    if (projectArray.projects[i].title === element?.value) {
      element.classList.add("invalid");
      errorTextElement!.textContent = "Project name exists.";
      return false;
    }
  }
  return true;
};

function validateExistingTask(
  formElement: React.RefObject<HTMLInputElement>,
  errorTextElementID: string,
  project: ProjectInterface
) {
  const element: HTMLInputElement | null = formElement.current;
  const errorTextElement: HTMLDivElement | null = document.querySelector(
    `#${errorTextElementID}`
  );
    if (errorTextElement === null) {
      return false;
    }
  for (let i = 0; i < project.tasks.length; i++) {
    if (project.tasks[i].title === element?.value) {
      element.classList.add("invalid");
      errorTextElement.textContent = "Task name exists.";
      return false;
    }
  }
  return true;
}

function validateExistingTaskExceptForCurrent(
  formElement: React.RefObject<HTMLInputElement>,
  errorTextElementID: string,
  project: ProjectInterface,
  currentTask: TaskInterface,
) {
  const element: HTMLInputElement | null = formElement.current;
  const errorTextElement: HTMLDivElement | null = document.querySelector(
    `#${errorTextElementID}`
  );
    if (errorTextElement === null) {
      return false;
    }
  for (let i = 0; i < project.tasks.length; i++) {
    
    if (currentTask.title === element?.value) {
      console.log("yeah1")
      continue;
    }
    if (project.tasks[i].title === element?.value) {
      console.log("yeah")
      element.classList.add("invalid");
      errorTextElement.textContent = "Task name exists.";
      return false;
    }
  }
  return true;
}

function removeErrorFields(
  formElement: React.RefObject<HTMLInputElement>,
  errorTextElementID: string
) {
  const element: HTMLInputElement | null = formElement.current;
  const errorTextElement: HTMLDivElement | null = document.querySelector(
    `#${errorTextElementID}`
  );
  if (element === null || element === undefined) {
    return;
  }
  if (element.classList.contains("invalid")) {
    element.classList.remove("invalid");
  }
  errorTextElement!.textContent = "";
}

export {
  validateRequiredInput,
  removeErrorFields,
  validateExistingProject,
  validateExistingTask,
  validateExistingProjectExceptForCurrent,
  validateExistingTaskExceptForCurrent
};
