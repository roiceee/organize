import { createContext } from "react";

interface UserSignInContextInterface {
  userSignIn: () => void;
  userSignOut: () => void;
}

const UserSignInContext = createContext<UserSignInContextInterface>({
  userSignIn: () => {},
  userSignOut: () => {},
});


export default UserSignInContext;