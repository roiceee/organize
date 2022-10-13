import Button from "react-bootstrap/Button";
//this component serves as a skeleton for "Add Project" and "Add Task" button components
interface AddButtonProps {
  onClick: () => void;
  children: JSX.Element | Array<JSX.Element>;
}
function AddButton({ onClick, children }: AddButtonProps) {
  return (
    <Button variant="action" onClick={onClick} style={{ maxWidth: "300px" }}>
      {children}
    </Button>
  );
}

export default AddButton;
