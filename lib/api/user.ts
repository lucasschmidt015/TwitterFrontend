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

type ImageData = {
    uri: string;
    name: string;
    type: string;
};

export const updateProfilePicture = async (imageData: ImageData, accessToken : string) => {
    const formData = new FormData();
    formData.append('image', {
        uri: imageData.uri,
        name: imageData.name,
        type: imageData.type,
    });

    try {
        const response = await fetch(`${API_URL}/user/updateProfilePicture`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        const data = await response.json();

        if (response.status !== 201) {
            
            throw new Error(data.error);
        }

        return data;
        
    } catch (err) {
        throw new Error(err.message);
    }
}