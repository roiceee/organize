// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";

interface InstallPWAProps {
    className?: string;
}

function InstallPWA({className}: InstallPWAProps) {
  const deferredPrompt = useRef<Event | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const showDiv = useCallback(() => {
    setShow(true);
  }, [])


  const installApp = useCallback(async () => {
    if (deferredPrompt.current !== null) {
        deferredPrompt.current.prompt();
        const { outcome } = await deferredPrompt.current.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt.current = null;
        }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: Event) => {
        showDiv();
      deferredPrompt.current = e;
    });
  }, [showDiv]);

  return (
    <>
      {show && (
        <div
          className={`bg-light text-center p-1 text-black ${className}`}
        >
          Organize is installable as an app!
          <Button
            variant="action"
            className="rounded rounded-pill"
            style={{ transform: "scale(0.8)" }}
            onClick={installApp}
          >
            Install
          </Button>
        </div>
      )}
    </>
  );
}

export default InstallPWA;
