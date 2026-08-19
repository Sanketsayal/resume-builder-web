import axios from "axios";
import { getAccessToken } from "./token";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10_100,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken)
        config.headers.Authorization = ` Bearer ${accessToken}`;

    return config;
});