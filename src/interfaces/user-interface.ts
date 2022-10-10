import { StaticImageData } from "next/image";

interface UserTypeInterface {
  userInformation: {
    uid: string;
    name: string | null;
    email: string | null;
    photoURL: StaticImageData;
  };
  isLoggedIn: boolean;
  isLocalUser: boolean;
}

export default UserTypeInterface;
