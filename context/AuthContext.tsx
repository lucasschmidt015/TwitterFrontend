import { useRouter, useSegments } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { checkAccessToken } from "@/lib/api/auth";

const AuthContext = createContext({});

const AuthContextProvider = ({children}: PropsWithChildren) => {

    const [accessToken, setAccessToken] = useState< string | null >(null);
    const [refreshToken, setRefreshToken] = useState< string | null >(null);

    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const isAuthGroup = segments[0] === '(auth)';

        if (!accessToken && !isAuthGroup) {
            router.replace('/signIn');
        } 
        if (accessToken && isAuthGroup) {
            router.replace('/');
        }


    }, [segments, accessToken]);

    useEffect(() => {
        const loadApplicationToken = async () => {
            const storedAccessToken = await SecureStore.getItemAsync('accessToken');
            const storedRefreshToken = await SecureStore.getItemAsync('refreshToken');

            if (!storedAccessToken || !storedRefreshToken) {
                return;
            }

            //This function will check if the token is still valid, and try to refresh it if it's not;
            const response = await checkAccessToken({ accessToken: storedAccessToken as string, refreshToken: storedRefreshToken as string });

            if (!response?.stillValid) {
                if (response?.UpdatedTokens) {
                    updateAuthToken(response?.UpdatedTokens.accessToken, response?.UpdatedTokens.refreshToken)
                }
                else {
                    await clearLogin();
                }
                return;
            }

            if (storedAccessToken) {
                setAccessToken(storedAccessToken);
            }

            if (storedRefreshToken) {
                setRefreshToken(storedRefreshToken);
            }
        }
        
        loadApplicationToken();
    }, []);

    const updateAuthToken = async (newAccessToken: string, newRefreshToken: string) => {
        await SecureStore.setItemAsync('accessToken', newAccessToken);
        await SecureStore.setItemAsync('refreshToken', newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
    }

    const clearLogin = async () => { // <-------- We'll have to send a request to invalidate the token here
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');

        setAccessToken(null);
        setRefreshToken(null);
        
        //setar as states aqui tbm
    }

    return (
        <AuthContext.Provider value={{ accessToken, updateAuthToken, clearLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
