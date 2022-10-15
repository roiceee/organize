import { useCallback, useContext, useEffect, useState } from "react";
import IsAppLoadingContext from "../contexts/is-app-loading-context";
import UserTypeContext from "../contexts/user-context";
import Footer from "./footer";
import NavigationBar from "./navbar";
import LoadingNotice from "./util-components/loading-notice";
import NoInternetAlert from "./util-components/no-internet-alert";


interface LayoutProps {
  children: JSX.Element;
}
function Layout({ children }: LayoutProps) {
  const isAppLoading = useContext(IsAppLoadingContext);


  if (isAppLoading) {
    return <LoadingNotice />;
  }

  return (
    <>
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex flex-column justify-content-between gap-1"
      >
        <div>
          <NavigationBar />
          <NoInternetAlert/>
          <div>{children}</div>
        </div>
        <div className="mt-3">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
