import axios from './axios';

export const getAllLocations = async () => {
  const response = await axios.get("locations/getAllLocations");
  return response.data;
};

export const getLocationsByClassId = async (class_id: number) => {
 const response = await axios.get(`locations/getLocationsByClassId/${class_id}`);
 return response.data;
};

export const getAllFarStudents = async (class_id: number, user_id: string) => {
  const response = await axios.get(`locations/getAllFarStudents/${class_id}/${user_id}`);
  return response.data;
};