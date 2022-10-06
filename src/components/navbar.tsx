import Image from "next/image";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import UserSignInContext from "../contexts/user-sign-in-context";
import homeIcon from "../images/home.svg";
import aboutIcon from "../images/info.svg";
import UserDiv from "./user-div";

enum NavigationBarConstants {
  titleCollapseBreakPoint = 310,
}

function NavigationBar() {
  const navbarCollapseToggle = useRef<HTMLButtonElement>(null);

  const [viewportSizeState, setViewportSizeState] = useState(
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  );
  const { userSignIn, userSignOut } = useContext(UserSignInContext);

  onresize = () => {
    setViewportSizeState(
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )
    );
  };
  return (
    <Navbar
      key="md"
      bg="primary"
      expand="md"
      variant="dark"
      className="mb-2 text-light"
    >
      <Container>
        <div className="d-flex">
          <Image
            src="/organize-icon.png"
            alt="organize icon"
            width={30}
            height={30}
            className="d-inline-block my-auto"
          />
          <Link href="/">
            <div style={{ fontSize: "1.25rem" }} className="mx-2">
              {viewportSizeState >
              NavigationBarConstants.titleCollapseBreakPoint
                ? "Organize"
                : ""}
            </div>
          </Link>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <Navbar.Text className="mt-1">
            <Link href="/">
              <a className="text-light text-decoration-none">
                <Image src={homeIcon} alt="Home" />
              </a>
            </Link>
          </Navbar.Text>
          <Navbar.Text className="mt-1">
            <Link href="/about">
              <a className="text-light text-decoration-none">
                <Image src={aboutIcon} alt="About" />
              </a>
            </Link>
          </Navbar.Text>
          <Navbar.Text style={{ marginLeft: "12px" }}>
            <UserDiv signInHandler={userSignIn} signOutHandler={userSignOut} />
          </Navbar.Text>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
