import { createContext, PropsWithChildren, useContext } from "react";
import Toast from "react-native-toast-message";

type ToastArgs = {
    type: string;
    text1: string;
    text2?: string;
    position?: 'top' | 'bottom';
    visibleTime?: number;
};

const GeneralContext = createContext({});

const GeneralContextProvider = ({ children }: PropsWithChildren) => {

    const driveURL = "https://drive.google.com/uc?export=view&id=";
    const defaultImageId = "1w3UY2U76y6flPEoA_wanrgHZY2zhUWML";

    const showToast = (args: ToastArgs) => {
        Toast.show(args);
    }

    return (
        <GeneralContext.Provider value={{showToast, driveURL, defaultImageId}}>
            {children}
            <Toast/>
        </GeneralContext.Provider>
    )
}


export default GeneralContextProvider;

export const generalContext = () => useContext(GeneralContext);