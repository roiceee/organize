import Image from "next/image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import cover from "../../images/cover.png";
import cover2 from "../../images/cover2.png";
import HeadWrapper from "../head-wrapper";
import { useRouter } from "next/router";
import { useCallback } from "react";
import InstallPWAButton from "../util-components/install-PWA";
function NoUserContainer() {
  const router = useRouter();

  const redirectToLoginPage = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <>
      <HeadWrapper />
      <Container className="col col-lg-8">
        <Row className="text-center my-5">
          <div>
            <section className="d-flex flex-column justify-content-center align-items-center gap-3">
              <h1>Welcome to Organize!</h1>
              <div>Manage your tasks in a simple, straightforward way.</div>
              <Button
                variant="primary"
                className="px-5 fw-bold fs-5"
                onClick={redirectToLoginPage}
              >
                Sign in - it&apos;s free
              </Button>
              <InstallPWAButton className="px-5 fs-5"/>
              <div>
                <hr />
                <div className="d-flex flex-column gap-4">
                  <div>
                    <h5>Projects serve as folders of your tasks.</h5>
                    <Image
                      src={cover}
                      alt="Organize"
                      className="border border-2 rounded-3"
                    />
                  </div>
                  <div>
                    <h5>Organize related tasks inside your projects.</h5>
                    <Image
                      src={cover2}
                      alt="Organize"
                      className="border border-2 rounded-3"
                    />
                  </div>
                </div>
              </div>
            </section>
            <div className="d-flex flex-column align-items-center gap-1 my-4">
              <h6>Easy to use.</h6>
              <h6>Lightweight - doesn&apos;t take too much space.</h6>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default NoUserContainer;
