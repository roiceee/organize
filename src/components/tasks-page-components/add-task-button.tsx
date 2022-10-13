import AddButton from "../util-components/add-button";
import Image from "next/image";
import paperplusIcon from "../../images/paperplus.svg";
interface AddProjectButtonProps {
  onClick: () => void;
}

function AddTaskButton({ onClick }: AddProjectButtonProps) {
  return (
    <AddButton onClick={onClick}>
      <div className="d-flex justify-content-center align-content-center gap-2">
        Add Task
        <Image src={paperplusIcon} height={20} width={20} alt="Task" />
      </div>
    </AddButton>
  );
}

export default AddTaskButton;
