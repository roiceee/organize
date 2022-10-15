import Image from "next/image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import cover from "../../images/cover.png";
import cover2 from "../../images/cover2.png";
import HeadWrapper from "../head-wrapper";
import { useRouter } from "next/router";
import { useCallback } from "react";
function NoUserContainer() {
  const router = useRouter();

  const redirectToLoginPage = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <>
      <HeadWrapper />
      <Container>
        <Row className="text-center my-5">
          <div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3">
              <h1>Welcome to Organize!</h1>
              <div>Manage your tasks in a simple, straightforward way.</div>
              <Button
                variant="primary"
                className="px-5 mb-4 fw-bold"
                style={{ width: "fit-content", transform: "scale(1.2)"}}
                onClick={redirectToLoginPage}
              >
                Sign in - it&apos;s free
              </Button>
              <Image
                src={cover}
                alt="Organize"
                className="border border-2 rounded-3"
              />
              <Image
                src={cover2}
                alt="Organize"
                className="border border-2 rounded-3"
              />
            </div>
            <div className="d-flex flex-column align-items-center gap-1 my-4">
              <h4>Easy to use.</h4>
              <h4>Lightweight - doesn&apos;t take too much space.</h4>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default NoUserContainer;
