
import axiosInstance from "../services/axios";

export const setSession = (token: string, user?: any) => {
    localStorage.setItem('token', token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const getSession = () => {
    const token = localStorage.getItem('token');
    return token;
}

export const getUserSession = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export const removeSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axiosInstance.defaults.headers.common.Authorization;
}
