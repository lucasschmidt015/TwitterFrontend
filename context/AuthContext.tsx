import { useRouter, useSegments } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext({});

const AuthContextProvider = ({children}: PropsWithChildren) => {

    const [authToken, setAuthToken] = useState< string | null >(null);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const isAuthGroup = segments[0] === '(auth)';

        if (!authToken && !isAuthGroup) {
            router.replace('/signIn');
        } 
        if (authToken && isAuthGroup) {
            router.replace('/');//<----------
        }


    }, [segments, authToken]);

    useEffect(() => {
        const loadApplicationToken = async () => {
            const storedToken = await SecureStore.getItemAsync('authToken');

            if (storedToken) {
                setAuthToken(storedToken);
            }
        }
        
        loadApplicationToken();
    }, []);

    const updateAuthToken = async (newToken: string) => {
        await SecureStore.setItemAsync('authToken', newToken);

        setAuthToken(newToken);
    }

    return (
        <AuthContext.Provider value={{ authToken, updateAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);