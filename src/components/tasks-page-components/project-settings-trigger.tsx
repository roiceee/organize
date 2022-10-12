import Image from "next/image";
import settingsIcon from "../../images/settings.svg";

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
      <div>Project Settings</div>
      <Image
        src={settingsIcon}
        style={{ color: "black" }}
        height={16}
        width={16}
        alt="Project Settings"
      />
    </div>
  );
}

export default ProjectSettingsTrigger;
