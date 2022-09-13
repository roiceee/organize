import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";

function NavigationBar() {

  const navbarCollapseToggle = useRef<HTMLButtonElement>(null);

  const closeNavbar = useCallback(() => {
      navbarCollapseToggle.current!.click();
  }, [navbarCollapseToggle])

  return (
    <Navbar
      key="md"
      bg="primary"
      expand="md"
      variant="dark"
      className="mb-3 text-light"
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
          <div style={{ fontSize: "1.25rem" }} className="mx-2" onClick={closeNavbar}>
            Organize
          </div>
        </Link>
        </div>
        <Navbar.Toggle ref={navbarCollapseToggle} aria-controls={`offcanvasNavbar-expand-$"md"`} />
        <Navbar.Collapse id="basic-navbar-nav" className="mt-2 mt-md-0">
          <Nav className="me-auto mx-md-4">
          <Navbar.Text>
              <Link href="/">
                <a className="text-light text-decoration-none mx-md-3" onClick={closeNavbar}>
                  Projects
                </a>
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link href="#action1">
                <a className="text-light text-decoration-none mx-md-3" onClick={closeNavbar}>
                  Sign in
                </a>
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link href="/about">
                <a className="text-light text-decoration-none mx-md-3 " onClick={closeNavbar}>
                  About
                </a>
              </Link>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
