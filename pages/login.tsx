import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BodyLayoutTwo from "../src/components/body-layout-two";
import HeadWrapper from "../src/components/head-wrapper";
import UserTypeContext from "../src/contexts/user-context";
import UserSignInContext from "../src/contexts/user-sign-in-context";
import { createDefaultUser } from "../src/defaults/default-user";
import googleIcon from "../src/images/sign-in/google.svg";
import pic1 from "../src/images/sign-in/pic1.svg";

function LogIn() {
  const router = useRouter();
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const { userSignIn, userSignOut } = useContext(UserSignInContext);
  
  const redirectToApp = useCallback(() => {
    router.push("/")
  }, [router])

  const continueAsLocalUser = useCallback(() => {
    userSignOut();
    setUserStateType(createDefaultUser());
    redirectToApp()
  }, [setUserStateType, userSignOut, redirectToApp]);


 
  
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
              <Row className="p-4 justify-content-center">
                <Image src={pic1} height={500} width={500} alt="Task Image" />
              </Row>
            </>
          }
          rightElements={
            <Container className="d-flex h-100 w-100">
              <Row className="my-auto mx-auto">
                <Row className="mb-3">
                  <h3>Log in</h3>
                </Row>

                <Row className="mx-auto justify-content-center gap-2">
                  <Row className="text-center">
                    <Button
                      variant="action"
                      className="d-flex align-items-center gap-3 justify-content-center"
                      onClick={userSignIn}
                    >
                      <Image
                        src={googleIcon}
                        alt="Google Icon"
                        height={20}
                        width={20}
                      />
                      <b>Continue with Google</b>
                    </Button>
                    <div style={{ fontSize: "0.8rem" }} className="text-gray">
                      Manage your tasks on any device! (Recommended)
                    </div>
                  </Row>
                  <hr className="my-1"/>
                  <Row className="text-center">
                    <Button
                      variant="outline-gray"
                      onClick={continueAsLocalUser}
                    >
                      Continue as Guest
                    </Button>
                    <div style={{ fontSize: "0.8rem" }} className="text-gray">
                      Manage your tasks only on this browser.
                    </div>
                  </Row>
                  <Row>
                    <Link href={"/about"}>
                      <div className="d-flex align-items-center gap-1 justify-content-end mt-2">
                        <a
                          className=" text-gray"
                          style={{ fontSize: "0.8rem" }}
                        >
                          I&apos;m new to this app
                        </a>
                      </div>
                    </Link>
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
