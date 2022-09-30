import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
interface DescriptionPopoverProps {
  title: string;
  description: string;
}

function DescriptionPopover({ title, description }: DescriptionPopoverProps) {
  const [show, setShow] = useState(false);

  return (
    <Accordion className="my-2">
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <span style={{ fontSize: "0.9rem" }}>{title}</span>
        </Accordion.Header>
        <Accordion.Body style={{ overflowWrap: "break-word" }}>
          {description === "" ? "No description." : description}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DescriptionPopover;
