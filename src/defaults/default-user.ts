import UserTypeInterface from "../interfaces/user-interface";
import profileIcon from "../images/user-icon.svg"

function createDefaultUser() : UserTypeInterface{
    return {
        userInformation: {
            name: "Local User",
            email: "Local User",
            photoURL: profileIcon
        },
        isLoggedIn: false,
    }
}

function createEmptyUser() : UserTypeInterface{
    return {
        userInformation: {
            name: "",
            email: "",
            photoURL: profileIcon
        },
        isLoggedIn: false,
    }
}

export  {createDefaultUser, createEmptyUser};