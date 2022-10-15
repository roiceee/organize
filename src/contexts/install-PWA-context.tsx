import { createContext } from "react";

interface InstallPWAContextInterface {
  showInstallPWADiv: boolean;
  hideInstallPWA: () => void;
  installPWA: () => void;
}

const InstallPWAContext = createContext<InstallPWAContextInterface>({
  showInstallPWADiv: false,
  hideInstallPWA: () => {},
  installPWA: () => {},
});

export default InstallPWAContext;
