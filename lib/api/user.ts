import { API_URL } from "./config";
import { User } from "@/types";

export const getLoggedUserInfo = async (accessToken: string) => {

    try {
        const response = await fetch(`${API_URL}/user/loggedUser`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        return await response.json();

    } catch (err) {
        throw new Error(err);
    }

}   

export const createNewUser = async (data: User) => {
    try {
        const response = await fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        
        if (response.status !== 201) {
            const error = await response.json();
            throw new Error(error.error);
        }

        const fetchData = await response.json();

        return fetchData;

    } catch (err) {
        throw new Error(err.message);
    }

}