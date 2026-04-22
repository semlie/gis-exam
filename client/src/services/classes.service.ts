
import axios from './axios';

export const getClasses = async () => {
  const response = await axios.get("classes/getAllClasses");
  return response.data;
};


