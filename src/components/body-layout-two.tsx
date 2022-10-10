import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface BodyLayoutTwoProps {
  leftElements: JSX.Element | Array<JSX.Element>;
  rightElements: JSX.Element | Array<JSX.Element>;
}

function BodyLayoutTwo({ leftElements, rightElements }: BodyLayoutTwoProps) {
  return (
    <Row className="mt-4">
      <Col lg={6}>{leftElements}
      </Col>
      <Col lg={1}></Col>
      <Col lg={5}>{rightElements}</Col>
    </Row>
  );
}

export default BodyLayoutTwo;