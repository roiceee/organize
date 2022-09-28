import { createContext } from "react";


const IsAppLoadingContext = createContext<boolean>(false);

export default IsAppLoadingContext;