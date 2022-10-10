import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import UserTypeContext from "../contexts/user-context";
import UserSignInContext from "../contexts/user-sign-in-context";
import homeIcon from "../images/home.svg";
import aboutIcon from "../images/info.svg";
import { isLoggedInUser, isNotUser } from "../utils/user-checks";
import UserDiv from "./user-div";
import utilStyles from "../styles/modules/util-styles.module.scss";

enum NavigationBarConstants {
  titleCollapseBreakPoint = 310,
}

function NavigationBar() {
  const { userTypeState } = useContext(UserTypeContext);
  const navbarCollapseToggle = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const [viewportSizeState, setViewportSizeState] = useState(
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  );
 
  onresize = () => {
    setViewportSizeState(
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )
    );
  };

  //loop through all navbar items and highlight current page
  useEffect(() => {
    
    const navItems = document.querySelectorAll(".activable");
    navItems.forEach((navItem) => {
      const linkID = navItem.getAttribute("data-link");
      if (navItem.classList.contains(utilStyles.borderBottomWhite)) {
        navItem.classList.remove(utilStyles.borderBottomWhite);
      }
      if (linkID === router.asPath) {
        navItem.classList.add(utilStyles.borderBottomWhite);
      }
    });
  }, [ router]);
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
          <Link href={isNotUser(userTypeState) ? "login" : "/"}>
            <div style={{ fontSize: "1.25rem" }} className="mx-2">
              {viewportSizeState >
              NavigationBarConstants.titleCollapseBreakPoint
                ? "Organize"
                : ""}
            </div>
          </Link>
        </div>
        {!isNotUser(userTypeState) && (
          <div className="d-flex gap-3 align-items-center">
            <Navbar.Text className="mt-1 activable" data-link="/">
              <Link href="/">
                <a className="text-light text-decoration-none">
                  <Image src={homeIcon} alt="Home" />
                </a>
              </Link>
            </Navbar.Text>
            <Navbar.Text className="mt-1 activable" data-link="/about">
              <Link href="/about">
                <a className="text-light text-decoration-none">
                  <Image src={aboutIcon} alt="About" />
                </a>
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <UserDiv />
            </Navbar.Text>
          </div>
        )}
        {isNotUser(userTypeState) && (
          <div className="d-flex gap-3 align-items-center">
            <Navbar.Text className="activable" data-link="/login">
              <Link href="/login">
                <a className="text-light text-decoration-none">Log in</a>
              </Link>
            </Navbar.Text>
            <Navbar.Text className="activable" data-link="/about">
              <Link href="/about">
                <a className="text-light text-decoration-none">About</a>
              </Link>
            </Navbar.Text>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
