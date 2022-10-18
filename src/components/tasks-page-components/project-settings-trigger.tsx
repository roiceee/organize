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
      <Image
        src={settingsIcon}
        style={{ color: "black" }}
        height={22}
        width={22}
        alt="Project Settings"
      />
    </div>
  );
}

export default ProjectSettingsTrigger;
