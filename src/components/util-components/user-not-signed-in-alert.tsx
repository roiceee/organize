import { useCallback, useContext, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import UserTypeContext from "../../contexts/user-context";
import UserSignInContext from "../../contexts/user-sign-in-context";
import {
  isLocalUser,
  isLoggedInUser,
  isNotUser,
} from "../../utils/user-checks";

function UserNotSignedInAlert() {
  const { userSignOut } = useContext(UserSignInContext);
  const { userTypeState } = useContext(UserTypeContext);
  const [show, setShow] = useState(false);

  const hideAlert = useCallback(() => {
    setShow(false);
  }, []);

  const showAlert = useCallback(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (isLocalUser(userTypeState)) {
      showAlert();
      return;
    }
    hideAlert();
  }, [userTypeState, showAlert, hideAlert]);

  return (
    <>
      {show && (
        <Alert
          variant="warning"
          className="py-2 d-flex justify-content-center align-items-center gap-2"
          onClose={hideAlert}
        >
          <div>
            <span
              onClick={userSignOut}
              className="fw-bold text-decoration-underline"
            >
              Log in
            </span>{" "}
            to access your projects on any device!
          </div>
          <button className="btn btn-close" onClick={hideAlert}></button>
        </Alert>
      )}
    </>
  );
}

export default UserNotSignedInAlert;
