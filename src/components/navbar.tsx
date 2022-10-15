import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import organizeIcon from "../../public/icon.png";
import UserTypeContext from "../contexts/user-context";
import homeIcon from "../images/home.svg";
import aboutIcon from "../images/info.svg";
import utilStyles from "../styles/modules/util-styles.module.scss";
import { isNotUser } from "../utils/user-checks";
import UserDiv from "./user-div";

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
      className="text-light"
    >
      <Container>
        <div className="d-flex">
          <Image
            src={organizeIcon}
            alt="organize icon"
            width={30}
            height={30}
            className="my-auto"
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
            <div className="d-flex gap-3">
            <Navbar.Text className="activable" data-link="/">
              <Link href="/">
                <a className="text-light text-decoration-none">
                  <Image src={homeIcon} height={25} width={25} alt="Home" />
                </a>
              </Link>
            </Navbar.Text>
            <Navbar.Text className=" activable" data-link="/about">
              <Link href="/about">
                <a className="text-light text-decoration-none">
                  <Image src={aboutIcon} height={25} width={25} alt="About" />
                </a>
              </Link>
            </Navbar.Text>
            </div>
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
