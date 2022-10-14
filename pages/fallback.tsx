import Image from "next/image";
import { useCallback } from "react";
import Container from "react-bootstrap/Container";
import HeadWrapper from "../src/components/head-wrapper";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import image from "../src/images/no-signal.svg";

function Fallback() {
  const router = useRouter();
  const refreshPage = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <>
      <HeadWrapper />
      <Container style={{ minWidth: "100%" }}>
        <div className="d-flex flex-column gap-2 align-items-center justify-content position-absolute top-50 start-50 translate-middle">
          <Image src={image} height={200} width={200} alt="No-Signal" />
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 text-center">
            <div>No internet connection.</div>
            <Button onClick={refreshPage} variant={"primary"}>
              Go Back
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Fallback;
