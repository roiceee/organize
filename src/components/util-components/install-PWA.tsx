import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import InstallPWAContext from "../../contexts/install-PWA-context";

function InstallPWA() {
  const { showInstallPWADiv, installPWA, hideInstallPWA } =
    useContext(InstallPWAContext);

  return (
    <>
      {showInstallPWADiv && (
        <div
          style={{ fontSize: "0.9rem" }}
          className="bg-light p-1 text-black justify-content-center align-items-center d-flex gap-1"
        >
          Organize is installable as an app!
          <Button
            variant="action"
            className="rounded rounded-pill"
            style={{ transform: "scale(0.8)" }}
            onClick={installPWA}
          >
            Install
          </Button>
          <CloseButton onClick={hideInstallPWA} />
        </div>
      )}
    </>
  );
}

export default InstallPWA;
