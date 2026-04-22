
import axios from './axios';
import { user } from './types';

export const register = async (payload: user) => {
  const response = await axios.post("users/register", payload);
  return response.data;
};


