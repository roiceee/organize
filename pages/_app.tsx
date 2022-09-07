import "../styles/globals.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import ProjectArrayContext from "../contexts/project-array-context";
import { useState } from "react";
import ProjectArrayInterface from "../interfaces/project-array-interface";

function MyApp({ Component, pageProps }: AppProps) {


  const [projectArrayState, setProjectArrayState] = useState<ProjectArrayInterface>({projects: []})

  return (
    <ProjectArrayContext.Provider value={{projectArrayState, setProjectArrayState}}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ProjectArrayContext.Provider>
  );
}

export default MyApp;