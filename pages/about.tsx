import Container from "react-bootstrap/Container";
import BodyLayoutThree from "../src/components/body-layout-three";
import HeadWrapper from "../src/components/head-wrapper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ChangeEvent, useCallback, useState } from "react";
import { sendRecommendationToStorage } from "../src/utils/storage";
import FloatingAlert from "../src/components/util-components/floating-alert";


function About() {
  const [formContentState, setFormContentState] = useState<string>("");
  const [thankyouAlertState, setThankYouAlertState] = useState<boolean>(false);

  const showThankyouAlertState = useCallback(() => {
    setThankYouAlertState(true);
  }, []);

  const hideThankyouAlertState = useCallback(() => {
    setThankYouAlertState(false);
  }, []);

  const formContentHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormContentState(e.target.value);
  }, []);

  const sendRecommendationHandler = useCallback(() => {
    if (formContentState === "") {
      return;
    }
    sendRecommendationToStorage(formContentState);
    showThankyouAlertState();
    setFormContentState("");
    setTimeout(() => {
      hideThankyouAlertState();
    }, 5000);
  }, [formContentState, showThankyouAlertState, hideThankyouAlertState]);


  return (
    <>
      <HeadWrapper title="About" />
      <Container>
        <BodyLayoutThree>
          <section>
            <header>
              <h1>About</h1>
            </header>
            <hr />
            <article>
              <header>
                <h4 className="text-action">What is Organize?</h4>
              </header>
              <p>
                Organize is a task manager app designed for simple and
                straightforward management of projects and tasks. Your entire
                portfolio is composed of projects, while projects are composed
                of tasks.
              </p>
            </article>
            <article>
              <header>
                <h4 className="text-action">Should I sign in or not?</h4>
              </header>
              <p>
                As of now, Organize users can choose to log in their Google
                Account, or use the app as a Local User. This section would
                explain these two methods.
              </p>

              <h6>&bull; Logged-in User (Recommended)</h6>
              <p>
                Using Firebase&apos;s Authentication, you can log in your Google
                account when using Organize. This would enable you to access and
                manage your tasks and projects in any device.
              </p>
              <h6>&bull; Local User</h6>
              <p>
                If you don&apos;t want to log in your Google account, you can
                still use Organize as a local user. However, you can access your
                tasks and projects only on this browser. Only one local user per
                browser is allowed.
              </p>

              <p className="text-danger">
                <i>
                  Note: You cannot sync your local data once you&apos;ve decided
                  to sign-up later on. This is because the local user&apos;s
                  data should persist only on the local browser.
                </i>
              </p>
            </article>
            <article>
              <header>
                <h4 className="text-action">User Feedback</h4>
                <p>
                  Hi! Thanks for taking a peek on Organize. If you have any
                  recommendations or have found any bugs, please let me know.
                </p>
              </header>
            </article>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group controlId="recommendation" className="mb-2">
                <Form.Label>
                  <b>Send Recommendation</b>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Input here"
                  style={{ height: "100px" }}
                  value={formContentState}
                  onChange={formContentHandler}
                />
              </Form.Group>

              <div style={{ textAlign: "right" }}>
                <Button
                  variant="action"
                  className="px-5"
                  onClick={sendRecommendationHandler}
                >
                  Send
                </Button>
              </div>
            </Form>
          </section>
        </BodyLayoutThree>
      </Container>
      <FloatingAlert show={thankyouAlertState} onHide={hideThankyouAlertState}>
        <div className="text-center">Thanks for your response!</div>
      </FloatingAlert>
    </>
  );
}

export default About;
