import Row from "react-bootstrap/Row";
import utilStyles from "../../styles/modules/util-styles.module.scss"
interface StickyHeaderProps {
  mainDescriptionDiv: JSX.Element;
  sorter?: JSX.Element;
}

function StickyHeader({mainDescriptionDiv, sorter }: StickyHeaderProps) {
  return (
    <Row className={`position-sticky sticky-top bg-light mb-2 pt-2 pt-lg-2 ${utilStyles.shadowBottom}`}>
      <div className="d-flex justify-content-around align-items-center gap-3">
        <div className="text-center my-0">
          {mainDescriptionDiv}
        </div>

        <div>{(sorter !== undefined || sorter !== null) && sorter}</div>
      </div>
      {/* <hr className="my-0 mx-auto" /> */}
    </Row>
  );
}

export default StickyHeader;
