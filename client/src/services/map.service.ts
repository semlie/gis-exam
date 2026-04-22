import axios from './axios';

export const getAllLocations = async () => {
  const response = await axios.get("locations/getAllLocations");
  return response.data;
};