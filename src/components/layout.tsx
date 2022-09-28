import { useContext } from "react";
import UserSignInContext from "../contexts/user-sign-in-context";
import Footer from "./footer";
import NavigationBar from "./navbar";
import UserDiv from "./user-div";
interface LayoutProps {
  children: JSX.Element;
}
function Layout({ children }: LayoutProps) {
  const { userSignIn, userSignOut } = useContext(UserSignInContext);

  return (
    <>
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex flex-column justify-content-between gap-1 bg-light"
      >
        <div>
          <NavigationBar />
          <UserDiv signInHandler={userSignIn} signOutHandler={userSignOut} />
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
