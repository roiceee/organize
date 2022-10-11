import Col from "react-bootstrap/Col";

interface BodyLayoutThreeProps {
  children: JSX.Element | Array<JSX.Element>;
}

function BodyLayoutThree({ children }: BodyLayoutThreeProps) {
  return <Col className="col col-lg-8 mt-4 mx-auto">{children}</Col>;
}

export default BodyLayoutThree;
