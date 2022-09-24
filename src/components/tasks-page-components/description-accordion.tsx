import Accordion from "react-bootstrap/Accordion";
interface DescriptionPopoverProps {
  title: string;
  description: string;
}

function DescriptionPopover({ title, description }: DescriptionPopoverProps) {
  return (
    <Accordion className="my-2">
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <span style={{ fontSize: "0.9rem" }}>{title}</span>
        </Accordion.Header>
        <Accordion.Body style={{ overflowWrap: "break-word" }}>
          {description}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DescriptionPopover;
