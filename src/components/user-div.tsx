import Image from "next/image";
import { useCallback, useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import UserTypeContext from "../contexts/user-context";
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
      <div style={{ fontSize: "0.9rem" }}>
        <div className={`d-flex justify-content-end align-items-center`}>
          <Image
            className="rounded-circle"
            alt="user profile picture"
            height={24}
            width={24}
            src={userTypeState.userInformation.photoURL}
          />
          <Dropdown drop="start">
            <Dropdown.Toggle
              variant="none"
              className="border border-0 d-flex align-items-center text-white"
            ></Dropdown.Toggle>
            <Dropdown.Menu style={{ zIndex: "2147483638" }}>
              <Dropdown.ItemText>
                {userTypeState.userInformation.email}
              </Dropdown.ItemText>
              <Dropdown.Divider />
              {!userTypeState.isLoggedIn && (
                <Dropdown.Item
                  onClick={signInHandler}
                  className="fw-bold text-black"
                >
                  Sign In
                </Dropdown.Item>
              )}
              {userTypeState.isLoggedIn && (
                <Dropdown.Item
                  onClick={showSignOutModal}
                  className="fw-bold text-black"
                >
                  Sign Out
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          {/* {!userTypeState.isLoggedIn && (
            <Button
              variant="outline-action"
              style={{ fontSize: "0.9rem", transform: "scale(0.9)" }}
              className="mx-1"
              onClick={signInHandler}
            >
              Sign in
            </Button>
          )} */}
        </div>
      </div>
      <SignOutModal
        show={showModal}
        onHide={hideSignOutModal}
        signOutHandler={signOutHandler}
      />
    </>
  );
}

export default UserDiv;
