// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";

interface InstallPWAProps {
  className?: string;
}

function InstallPWAButton({ className }: InstallPWAProps) {
  const deferredPrompt = useRef<Event | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const showDiv = useCallback(() => {
    setShow(true);
  }, []);

  const installApp = useCallback(async () => {
    if (deferredPrompt.current !== null) {
      deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      if (outcome === "accepted") {
        deferredPrompt.current = null;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: Event) => {
      showDiv();
      deferredPrompt.current = e;
    });
  }, [showDiv]);

  return (
    <>
      {show && (
        <Button variant="action" onClick={installApp} className={className}>
          Install as an App
        </Button>
      )}
    </>
  );
}

export default InstallPWAButton;
