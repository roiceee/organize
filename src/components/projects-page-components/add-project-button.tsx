import AddButton from "../util-components/add-button";
import Image from "next/image";
import folderIcon from "../../images/folder.svg";
interface AddProjectButtonProps {
  onClick: () => void;
}

function AddProjectButton({ onClick }: AddProjectButtonProps) {
  return (
    <AddButton onClick={onClick}>
      <div className="d-flex justify-content-center align-content-center gap-2">
        Add Project
        <Image src={folderIcon} height={20} width={20} alt="Project" />
      </div>
    </AddButton>
  );
}

export default AddProjectButton;
