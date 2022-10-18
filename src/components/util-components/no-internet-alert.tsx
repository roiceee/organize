import { useCallback, useEffect, useRef, useState } from "react";

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
      console.log("offline")
      updateStatus();
    });

    window.addEventListener("online", () => {
      console.log("online")
      updateStatus();
    });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    
 

  return (
    <>
      {show && (
        <div
          className={`py-1 text-white text-center ${alertMessage.color} bg-opacity-75`}
          style={{ width: "100vw", fontSize: "0.7rem" }}
        >
          {alertMessage.message}
        </div>
      )}
    </>
  );
}

export default NoInternetAlert;
