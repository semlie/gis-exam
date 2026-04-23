
import axios from './axios';
import { user, userLogin } from './types';

export const register = async (payload: user) => {
  const response = await axios.post("users/register", payload);
  return response.data;
};

export const login = async (credentials: userLogin) => {
  const response = await axios.post("users/login", credentials);
  return response.data;
};

