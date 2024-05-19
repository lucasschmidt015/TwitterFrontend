import { API_URL } from "./config";

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