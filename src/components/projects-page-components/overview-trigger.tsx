import Image from "next/image";
import settings from "../../images/settings.svg";

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
      <Image src={settings} height={24} width={24} alt="Overview" />
    </div>
  );
}

export default OverviewTrigger;
