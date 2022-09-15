import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import styles from "../../styles/modules/util-styles.module.scss";

interface DescriptionPopoverProps {
  description: string;
}

function DescriptionPopover({ description }: DescriptionPopoverProps) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Project Description</Popover.Header>
      <Popover.Body>{description}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <div style={{ width: "fit-content" }} className={styles.underlineAction}>
        See Project Description
      </div>
    </OverlayTrigger>
  );
}

export default DescriptionPopover;
