import Alert from "react-bootstrap/Alert";
import styles from "../../styles/modules/transitions.module.scss";


interface FloatingAlertProps {
    children: JSX.Element | Array<JSX.Element>
    show: boolean;
    onHide: () => void;
}

function FloatingAlert({
  children,
  show,
  onHide
}: FloatingAlertProps) {
  return (
    <>
      {show && (
        <Alert
          variant="light"
          onClose={onHide}
          style={{
            position: "fixed",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            maxWidth: "400px",
            zIndex: "2147483638",
          }}
          className={`p-2 ${styles.fadeInFaster} shadow`}
        >
         {children}
        </Alert>
      )}
    </>
  );
}

export default FloatingAlert;
