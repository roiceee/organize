import Image from "next/image";
import { useCallback, useContext, useState, useRef, useMemo } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import UserTypeContext from "../contexts/user-context";
import SignOutModal from "./util-components/sign-out-modal";
import utilStyles from "../styles/modules/util-styles.module.scss";
import _ from "lodash";
import Link from "next/link";
import UserSignInContext from "../contexts/user-sign-in-context";

function UserDiv() {
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dropdownTogglerRef = useRef<HTMLButtonElement>(null);
  const { userSignOut } = useContext(UserSignInContext);

  const showSignOutModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const hideSignOutModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    if (!dropdownTogglerRef.current) {
      return;
    }
    dropdownTogglerRef.current.click();
  }, []);

  const formattedEmail = useMemo(() => {
    if (!userTypeState.isLoggedIn) {
      return userTypeState.userInformation.email;
    }
    if (userTypeState.userInformation.email === null) {
      return "";
    }
    const splitUserEmail = userTypeState.userInformation.email.split("@");
    const splitUserEmailFirstPart = _.truncate(splitUserEmail[0], {
      length: 12,
    });
    return `${splitUserEmailFirstPart}@${splitUserEmail[1]}`;
  }, [userTypeState.userInformation.email, userTypeState.isLoggedIn]);

  return (
    <>
      <div
        style={{
          fontSize: "0.9rem",
          borderLeft: "1px solid white",
          paddingLeft: "8px",
        }}
      >
        <div className={`d-flex justify-content-end align-items-center`}>
          <Image
            className="rounded-circle"
            alt="user profile picture"
            height={24}
            width={24}
            onClick={toggleDropdown}
            src={userTypeState.userInformation.photoURL}
          />
          <Dropdown drop="start">
            <Dropdown.Toggle
              variant="none"
              className="border border-0 d-flex align-items-center text-white"
              ref={dropdownTogglerRef}
            ></Dropdown.Toggle>
            <Dropdown.Menu style={{ zIndex: "2147483638" }}>
              <Dropdown.ItemText>{formattedEmail}</Dropdown.ItemText>
              <Dropdown.Divider />

              <Dropdown.Item
                onClick={showSignOutModal}
                className={`fw-bold text-danger ${utilStyles.textWhiteOnActive}`}
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <SignOutModal
        show={showModal}
        onHide={hideSignOutModal}
        signOutHandler={userSignOut}
      />
    </>
  );
}

export default UserDiv;
