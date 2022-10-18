import Row from "react-bootstrap/Row";
interface StickyHeaderProps {
  mainDescriptionDiv: JSX.Element;
  showTrigger?: JSX.Element;
  sorter?: JSX.Element;
}

function StickyHeader({mainDescriptionDiv,showTrigger, sorter }: StickyHeaderProps) {
  return (
    <Row className={`position-sticky sticky-top mb-2 pt-2 pt-lg-2 bg-white`} >
      <div className="d-md-flex justify-content-around align-items-center gap-3">
        <div className="text-center my-0">
          {mainDescriptionDiv}
        </div>

        <div className="d-flex justify-content-center align-items-center gap-4">
          <div>{(showTrigger !== undefined || showTrigger !== null) && showTrigger}</div>
          <div>{(sorter !== undefined || sorter !== null) && sorter}</div>
        </div>
      </div>
      <hr className="my-0 mx-auto" />
    </Row>
  );
}

export default StickyHeader;
