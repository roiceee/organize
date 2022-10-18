import Form from "react-bootstrap/Form";

interface ShowTasksTriggerProps {
  togglerAction: () => void;
}

function ShowTasksTrigger({ togglerAction }: ShowTasksTriggerProps) {
  return (
    <div
      className="my-0 d-flex justify-content-center align-items-center gap-2"
      style={{ fontSize: "0.8rem" }}
    >
      <div>Hide Done</div>
      <Form.Check
        onChange={togglerAction}
        className="my-0"
        type="checkbox"
        id="tasks-show"
      />
    </div>
  );
}

export default ShowTasksTrigger;
