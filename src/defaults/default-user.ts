import UserTypeInterface from "../interfaces/user-interface";
import profileIcon from "../images/user-profile.webp"

function createDefaultUser() : UserTypeInterface{
    return {
        userInformation: {
            uid: "",
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
            uid: "",
            name: "",
            email: "",
            photoURL: profileIcon
        },
        isLoggedIn: false,
    }
}

export  {createDefaultUser, createEmptyUser};