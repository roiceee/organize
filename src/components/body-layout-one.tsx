import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface BodyLayoutOne {
  leftElements: JSX.Element | Array<JSX.Element>;
  rightElements: JSX.Element | Array<JSX.Element>;
}

function BodyLayoutOne({ leftElements, rightElements }: BodyLayoutOne) {
  return (
    <Row >
      <Col lg={5} >{leftElements}</Col>
      <Col>{rightElements}</Col>
    </Row>
  );
}

export default BodyLayoutOne;
