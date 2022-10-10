import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BodyLayoutTwo from "../src/components/body-layout-two";
import HeadWrapper from "../src/components/head-wrapper";
import UserTypeContext from "../src/contexts/user-context";
import pic1 from "../src/images/sign-in/pic1.svg";
import Button from "react-bootstrap/Button";
import googleIcon from "../src/images/sign-in/google.svg";

function LogIn() {
  const router = useRouter();
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);

  //if user is logged in after accessing the page, redirect the user to the home page.
  if (userTypeState.isLoggedIn) {
    router.push("/");
    return <></>;
  }
  return (
    <>
      <HeadWrapper title="Log in" />
      <Container>
        <BodyLayoutTwo
          leftElements={
            <>
              <Row>
                <h1>Organize</h1>
                <div>Manage your tasks in a simple, straightforward way.</div>
              </Row>
              <Row className="p-2 justify-content-center">
                <Image src={pic1} height={500} width={500} alt="Task Image" />
              </Row>
            </>
          }
          rightElements={
            <Container className="d-flex h-100 w-100">
              <Row className="my-auto mx-auto">
                <Row className="mb-4">
                  <h3>Log in</h3>
                </Row>

                <Row className="mx-auto justify-content-center text-center gap-4">
                  <Row>
                    <Button
                      variant="action"
                      className="d-flex align-items-center gap-3 justify-content-center"
                    >
                      <Image
                        src={googleIcon}
                        alt="Google Icon"
                        height={20}
                        width={20}
                      />
                      <b>Continue with Google</b>
                    </Button>
                    <div style={{ fontSize: "0.9rem" }} className="text-gray">
                      Manage your tasks on any device!
                    </div>
                  </Row>
                  <Row>
                    <Button variant="outline-gray">
                      Continue as local user
                    </Button>
                    <div style={{ fontSize: "0.9rem" }} className="text-gray">
                      Manage your tasks only on this browser.
                    </div>
                  </Row>
                </Row>
              </Row>
            </Container>
          }
        />
      </Container>
    </>
  );
}

export default LogIn;
