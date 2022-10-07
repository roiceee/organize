import Image from "next/image";
import folderIcon from "../../images/folder.svg";

interface OverviewTriggerProps {
  onClick: () => void;
}
function OverviewTrigger({ onClick }: OverviewTriggerProps) {
  return (
    <div
      style={{ fontSize: "0.8rem" }}
      className="d-flex gap-1 text-gray"
      onClick={onClick}
    >
      <div>Overview</div>
      
        <Image src={folderIcon} height={14} width={14} alt="Overview" />
     
    </div>
  );
}

export default OverviewTrigger;
