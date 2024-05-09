import { API_URL } from "./config";

export const login = async (data: { email: string }) => {
    try {
        
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (res.status !== 200) {
            throw new Error('Something went wrong. try again later.')            ;
        }

    } catch (err) {
        throw new Error({ error: err });
    }
}

export const authenticate = async (data: { email: string, emailToken: string }) => {
    try {
        const res = await fetch(`${API_URL}/auth/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.status !== 200) {
            throw new Error('Error during the authentication process');
        }

        return await res.json();

    } catch (err) {
        throw new Error(err);
    }
}