import UserTypeInterface from "../interfaces/user-interface";

function isLocalUser(userType: UserTypeInterface) {
  return !userType.isLoggedIn && userType.isLocalUser;
}

function isLoggedInUser(userType: UserTypeInterface) {
  return userType.isLoggedIn;
}

function isNotUser(userType: UserTypeInterface) {
  return !userType.isLoggedIn && !userType.isLocalUser;
}


export { isLocalUser, isLoggedInUser, isNotUser };
