import React from "react";
import { createContext } from "vm";
import defaultProjectContextValue from "../defaults/default-project-context";
import ProjectInterface from "../interfaces/project-interface";

interface ProjectContextInterface {
    projectState : ProjectInterface;
    setProjectState : React.Dispatch<React.SetStateAction<ProjectInterface>>;
}


const projectContext = createContext(defaultProjectContextValue);

export type {projectContext as default, ProjectContextInterface}