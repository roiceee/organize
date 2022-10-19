import { useCallback, useEffect, useRef, useState } from "react";
import FloatingAlert from "./floating-alert";

const alertMessages = {
  offline: { message: "No internet connection.", color: "bg-gray" },
  online: { message: "Internet connection restored.", color: "bg-action" },
};

function NoInternetAlert() {
  const [show, setShow] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState(alertMessages.offline);
  const triggerOnlineAlert = useRef(false);

  const updateStatus = useCallback(() => {
    if (!navigator.onLine) {
      setShow(true);
      setAlertMessage(alertMessages.offline);
      triggerOnlineAlert.current = true;
      return;
    }
    if (!triggerOnlineAlert.current) {
      return;
    }
    setAlertMessage(alertMessages.online);
    setTimeout(() => {
      setShow(true);
      triggerOnlineAlert.current = false;
    }, 3000);
  }, []);

  useEffect(() => {
    window.addEventListener("offline", () => {
      console.log("offline");
      updateStatus();
    });

    window.addEventListener("online", () => {
      console.log("online");
      updateStatus();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FloatingAlert
        show={show}
        onHide={() => setShow(false)}
        className={`text-white bg-opacity-75 ${alertMessage.color}`}
      >
        <div className="d-flex justify-content-between">
          <div>{alertMessage.message}</div>
          <button className="btn-close btn-close-white" onClick={() => setShow(false)}></button>
        </div>
      </FloatingAlert>
    </>
  );
}

export default NoInternetAlert;
