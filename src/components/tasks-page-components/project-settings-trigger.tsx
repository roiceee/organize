import Image from "next/image";
import aboutIcon from "../../images/info-black.svg";

interface ProjectSettingsTriggerProps {
  showProjectSettingsModal: () => void;
}

function ProjectSettingsTrigger({
  showProjectSettingsModal,
}: ProjectSettingsTriggerProps) {

    
  return (
    <div
      className="d-flex gap-1 text-gray align-items-center"
      style={{ fontSize: "0.8rem" }}
      onClick={showProjectSettingsModal}
    >
      <div>Project Info</div>
      <Image
        src={aboutIcon}
        style={{ color: "black" }}
        height={16}
        width={16}
        alt="Project Settings"
      />
    </div>
  );
}

export default ProjectSettingsTrigger;
