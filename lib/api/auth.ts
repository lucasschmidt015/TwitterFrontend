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
            const error = await res.json();
            throw new Error(error.error);
        }

    } catch (err) {
        throw new Error(err.message);
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
            const error = await res.json();
            throw new Error(error.error);
        }

        return await res.json();

    } catch (err) {
        throw new Error(err.message);
    }
}

export const checkAccessToken = async (data: { accessToken: string, refreshToken: string }) => {
    try {
        const res = await fetch(`${API_URL}/auth/refreshToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return await res.json();

    } catch (err) {
        throw new Error(err);
    }

}

export const logout = async (obj: { accessToken: string, refreshToken: string }) => {
    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });

        return;

    } catch (err) {
        throw new Error(err);
    }
}