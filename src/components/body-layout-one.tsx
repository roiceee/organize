import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface BodyLayoutOne {
  leftElements: JSX.Element | Array<JSX.Element>;
  rightElements: JSX.Element | Array<JSX.Element>;
}

function BodyLayoutOne({ leftElements, rightElements }: BodyLayoutOne) {
  return (
    <Row>
      <Col lg={5}>{leftElements}
      </Col>
      <Col lg={1}></Col>
      <Col lg={5}>{rightElements}</Col>
    </Row>
  );
}

export default BodyLayoutOne;
