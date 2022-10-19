import { createContext } from "react";

interface IsAppLoadingContextInterface {
    isAppLoading: boolean;
}

const IsAppLoadingContext = createContext<IsAppLoadingContextInterface>({isAppLoading: false});

export default IsAppLoadingContext;