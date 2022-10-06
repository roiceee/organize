interface UserTypeInterface {
    userInformation: {
        uid: string;
        name: string | null;
        email: string | null;
        photoURL: string;
    }
    isLoggedIn: boolean
}

export default UserTypeInterface;