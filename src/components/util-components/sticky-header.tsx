import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
interface StickyHeaderProps {
  title: string;
  counter: number;
  sorter?: JSX.Element;
}

function StickyHeader({ title, counter, sorter }: StickyHeaderProps) {
  return (
    <Row className="position-sticky sticky-top bg-light py-3">
      <Row className="d-flex justify-content-around align-items-center">
        <Col xs={4}>
          <h6 className="text-center my-0">
            {title} ({counter})
          </h6>
        </Col>
        <Col>{(sorter !== undefined || sorter !== null) && sorter}</Col>
      </Row>
      <hr className="my-0 mx-auto" />
    </Row>
  );
}

export default StickyHeader;
