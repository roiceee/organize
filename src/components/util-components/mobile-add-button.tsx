import Button from "react-bootstrap/Button";
import utilStyles from "../../styles/modules/util-styles.module.scss"

interface MobileAddButtonProps {
  onClick: () => void;
}

//this is an add button only shown in smaller viewports
function MobileAddButton({ onClick }: MobileAddButtonProps) {
  return (
    <Button
      variant="outline-action"
      style={{ fontSize: "1.6rem", maxWidth: "300px" }}
      className={`p-0 ${utilStyles.showOnSmaller}`}
      onClick={onClick}
    >
      +
    </Button>
  );
}

export default MobileAddButton;
