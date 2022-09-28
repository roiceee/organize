import Container from "react-bootstrap/Container";
import Image from "next/image";
import { useCallback, useContext, useState } from "react";
import UserTypeContext from "../contexts/user-context";
import userIcon from "../images/user-icon.svg";
import Button from "react-bootstrap/Button";
import SignOutModal from "./util-components/sign-out-modal";

interface UserDivProps {
  signInHandler: () => void;
  signOutHandler: () => void;
}

function UserDiv({ signInHandler, signOutHandler }: UserDivProps) {
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const showSignOutModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const hideSignOutModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <Container style={{ fontSize: "0.9rem" }}>
        <div className={`d-flex justify-content-end align-items-center gap-2`}>
          <div>{userTypeState.userInformation.email}</div>
          <Image
            className="rounded-circle"
            alt="user profile picture"
            height={24}
            width={24}
            src={userTypeState.userInformation.photoURL}
          />
          {!userTypeState.isLoggedIn && (
            <Button
              variant="outline-action"
              style={{ fontSize: "0.9rem", transform: "scale(0.9)" }}
              className="mx-1"
              onClick={signInHandler}
            >
              Sign in
            </Button>
          )}
          {userTypeState.isLoggedIn && (
            <Button
              variant="outline-gray"
              style={{ fontSize: "0.9rem", transform: "scale(0.9)" }}
              className="mx-1"
              onClick={showSignOutModal}
            >
              Sign out
            </Button>
          )}
        </div>
      </Container>
      <SignOutModal
        show={showModal}
        onHide={hideSignOutModal}
        signOutHandler={signOutHandler}
      />
    </>
  );
}

export default UserDiv;
