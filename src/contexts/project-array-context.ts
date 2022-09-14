import React, { createContext } from "react";
import defaultProjectArrayContextValue from "../defaults/default-project-array-context";
import ProjectArrayInterface from "../interfaces/project-array-interface";

interface ProjectArrayContextInterface {
    projectArrayState: ProjectArrayInterface;
    setProjectArrayState: React.Dispatch<React.SetStateAction<ProjectArrayInterface>>;
}

const projectArrayContext = createContext<ProjectArrayContextInterface>(defaultProjectArrayContextValue);

export type {projectArrayContext as default, ProjectArrayContextInterface}