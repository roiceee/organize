import { useCallback, useContext, useEffect, useState } from "react";
import IsAppLoadingContext from "../contexts/is-app-loading-context";
import UserTypeContext from "../contexts/user-context";
import UserSignInContext from "../contexts/user-sign-in-context";
import Footer from "./footer";
import NavigationBar from "./navbar";
import UserDiv from "./user-div";
import LoadingNotice from "./util-components/loading-notice";
import UserNotSignedInAlert from "./util-components/user-not-signed-in-alert";
interface LayoutProps {
  children: JSX.Element;
}
function Layout({ children }: LayoutProps) {
  const { userSignIn, userSignOut } = useContext(UserSignInContext);
  const [userNotSignedInAlertState, setUserNotSignedInAlertState] =
    useState(false);
  const { userTypeState } = useContext(UserTypeContext);
  const isAppLoading = useContext(IsAppLoadingContext);

  const showUserNotSignedInAlert = useCallback(() => {
    setUserNotSignedInAlertState(true);
  }, []);

  const hideUserNotSignedInAlert = useCallback(() => {
    setUserNotSignedInAlertState(false);
  }, []);

  useEffect(() => {
    if (isAppLoading) {
      return;
    }
    if (!userTypeState.isLoggedIn) {
      showUserNotSignedInAlert();
      return;
    }
    hideUserNotSignedInAlert();
  }, [
    isAppLoading,
    userTypeState.isLoggedIn,
    showUserNotSignedInAlert,
    hideUserNotSignedInAlert,
  ]);

  if (isAppLoading) {
    return <LoadingNotice/>
  }

  return (
    <>
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex flex-column justify-content-between gap-1 bg-light"
      >
        <div>
          <NavigationBar />
          <div className="my-1">
            <UserNotSignedInAlert
              show={userNotSignedInAlertState}
              onHide={hideUserNotSignedInAlert}
            />
            <UserDiv signInHandler={userSignIn} signOutHandler={userSignOut} />
          </div>
          <div>{children}</div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
