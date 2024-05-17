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

    const showToast = (args: ToastArgs) => {
        Toast.show(args);
    }

    return (
        <GeneralContext.Provider value={{showToast}}>
            {children}
            <Toast/>
        </GeneralContext.Provider>
    )
}


export default GeneralContextProvider;

export const generalContext = () => useContext(GeneralContext);