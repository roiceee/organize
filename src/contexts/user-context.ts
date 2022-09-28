import React, { createContext } from "react";
import { createDefaultUser } from "../defaults/default-user";
import UserTypeInterface from "../interfaces/user-interface";

interface UserContextInterface {
  userTypeState: UserTypeInterface;
  setUserStateType: React.Dispatch<React.SetStateAction<UserTypeInterface>>;
}

const UserTypeContext = createContext<UserContextInterface>({
  userTypeState: { userInformation: createDefaultUser(), isLoggedIn: false },
  setUserStateType: () => {},
});

export default UserTypeContext;
