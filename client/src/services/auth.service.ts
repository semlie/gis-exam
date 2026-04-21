
import axios from './axios';

export const register = async (formData: FormData) => {
  const response = await axios.post("student/register", formData);
  return response.data;
};


