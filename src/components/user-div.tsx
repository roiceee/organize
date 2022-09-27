import Container from "react-bootstrap/Container";
import Image from "next/image";
import { useContext } from "react";
import UserTypeContext from "../contexts/user-context";
import userIcon from "../images/user-icon.svg";
import Button from "react-bootstrap/Button";

interface UserDivProps {
  signInHandler: () => void;
  signOutHandler: () => void;
}

function UserDiv({ signInHandler, signOutHandler }: UserDivProps) {
  const { userTypeState, setUserStateType } = useContext(UserTypeContext);

  return (
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
            variant="outline-dark"
            style={{ fontSize: "0.9rem", transform: "scale(0.9)" }}
            className="mx-1"
            onClick={signOutHandler}
          >
            Sign out
          </Button>
        )}
      </div>
    </Container>
  );
}

export default UserDiv;
