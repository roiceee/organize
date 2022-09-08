import React, { createContext, useContext, useState } from "react";
import ProjectArrayInterface from "../interfaces/project-array-interface";

interface ProjectArrayContextInterface {
    projectArrayState: ProjectArrayInterface;
    setProjectArrayState: React.Dispatch<React.SetStateAction<ProjectArrayInterface>>;
}

const ProjectArrayContext = createContext<ProjectArrayContextInterface>({
   projectArrayState: {projects: []},
   setProjectArrayState: () => {}
})

export default ProjectArrayContext;