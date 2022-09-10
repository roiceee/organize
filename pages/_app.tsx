import "../src/styles/globals.css";
import "../src/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../src/components/layout";
import UserTypeContext from "../src/contexts/user-context";
import UserTypeInterface from "../src/interfaces/user-interface"
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {

  //isLoggedIn value is set to false by default to use localStorage by default
  const [userTypeState, setUserStateType] = useState<UserTypeInterface>({isLoggedIn: false})

  return (
    <UserTypeContext.Provider value={{userTypeState, setUserStateType}}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </UserTypeContext.Provider>
  );
}

export default MyApp;
