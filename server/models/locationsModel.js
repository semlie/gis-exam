const locations = {
  getAllLocations: "SELECT l.user_id, l.coordinates, l.time, u.role FROM locations l LEFT JOIN users u ON l.user_id = u.user_id WHERE (l.user_id, l.time) IN (SELECT user_id, MAX(time) FROM locations GROUP BY user_id);",
  addLocations: "INSERT INTO locations (user_id, time, coordinates) VALUES (?, ?, ?)",
  getLocationsByClassId: "SELECT l.user_id, l.coordinates, l.time, u.role, u.first_name, u.last_name FROM locations l JOIN users u ON l.user_id = u.user_id WHERE u.class_id = ?  AND (l.user_id, l.time) IN (SELECT user_id, MAX(time) FROM locations GROUP BY user_id);",
  getLastLocationByUserId: "SELECT l.coordinates, l.time FROM locations l WHERE l.user_id = ? ORDER BY l.time DESC LIMIT 1"
};
export default locations;