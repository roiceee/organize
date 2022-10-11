import Accordion from "react-bootstrap/Accordion";
import { useCallback, useState } from "react";
import ProjectInterface from "../../interfaces/project-interface";
import TaskInterface from "../../interfaces/task-interface";
import formatDate from "../../utils/dateFormatter";
import { processDescription } from "../../utils/task-utils";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

interface DescriptionPopoverProps {
  title: string;
  task: TaskInterface;
}

function DescriptionPopover({ title, task }: DescriptionPopoverProps) {
  const [show, setShow] = useState<boolean>(false);

  const showTrigger = useCallback(() => {
    if (!show) {
      setShow(true);
    }
    setShow(false);
  }, [show, setShow]);

  const popover = (
    <Popover>
      <Popover.Header as="h3">{title}</Popover.Header>
      <Popover.Body style={{ overflowWrap: "break-word" }}>
        {processDescription(task)}
      </Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <Button
        variant="gray"
        className="p-1"
        style={{ fontSize: "0.8rem" }}
        onClick={showTrigger}
      >
        {show ? "Hide" : "Show"} {title}
      </Button>
    </OverlayTrigger>
  );
}

export default DescriptionPopover;
