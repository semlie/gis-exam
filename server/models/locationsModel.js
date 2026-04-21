const locations = {
  getAllLocations: "SELECT id, coordinates, time FROM locations WHERE (id, time) IN ( SELECT id, MAX(time) FROM locations GROUP BY id);",
  addLocations: "INSERT INTO locations (id, time, coordinates) VALUES (?, ?, ?)"
};
export default locations;