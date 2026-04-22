const locations = {
  getAllLocations: "SELECT user_id, coordinates, time FROM locations WHERE (user_id, time) IN (SELECT user_id, MAX(time) FROM locations GROUP BY user_id);",
  addLocations: "INSERT INTO locations (user_id, time, coordinates) VALUES (?, ?, ?)"
};
export default locations;