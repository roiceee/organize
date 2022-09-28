import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import UserSignInContext from "../../contexts/user-sign-in-context";

interface UserNotSignedInAlertProps {
  show: boolean;
  onHide: () => void;
}
function UserNotSignedInAlert({ show, onHide }: UserNotSignedInAlertProps) {
  const { userSignIn } = useContext(UserSignInContext);

  return (
    <>
      {show && (
        <Alert
          variant="warning"
          className="py-2 d-flex justify-content-center align-items-center gap-2"
          onClose={onHide}
        >
          <div>
            <span onClick={userSignIn} className="fw-bold text-decoration-underline">
              Sign in
            </span>{" "}
            to access your projects on any device!
          </div>
          <button className="btn btn-close" onClick={onHide}></button>
        </Alert>
      )}
    </>
  );
}

export default UserNotSignedInAlert;
