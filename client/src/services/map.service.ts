import axios from './axios';

export const getAllLocations = async () => {
  const response = await axios.get("locations/getAllLocations");
  return response.data;
};

export const getLocationsByClassId = async (class_id: number) => {
 const response = await axios.get(`locations/getLocationsByClassId/${class_id}`);
 return response.data;
};