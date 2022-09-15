
import Accordion from "react-bootstrap/Accordion"
interface DescriptionPopoverProps {
  description: string;
}

function DescriptionPopover({ description }: DescriptionPopoverProps) {
 

  return (
    
    <Accordion className="my-2">
    <Accordion.Item eventKey="1">
      <Accordion.Header><span style={{fontSize: "0.9rem"}}>Project Description</span></Accordion.Header>
      <Accordion.Body>
        {description}
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
  );
}

export default DescriptionPopover;
