import React, { createContext} from "react";
import UserTypeInterface from "../interfaces/user-interface";

interface UserContextInterface {
    userTypeState: UserTypeInterface;
    setUserStateType: React.Dispatch<React.SetStateAction<UserTypeInterface>>;
}

const UserTypeContext = createContext<UserContextInterface>({
   userTypeState: {isLoggedIn: false },
   setUserStateType: () => {}
})

export default UserTypeContext;