import database from '../db/initDB.js';
import locationsModel from '../models/locationsModel.js'
// פונקציה להמרת DMS (מעלות, דקות, שניות) לעשרוני
function dmsToDecimal(d, m, s) {
    return parseFloat(d) + (parseFloat(m) / 60) + (parseFloat(s) / 3600);
}
const locationsController = {
// שליפת כל הנקודות מהמסד
getAllLocations: async (req, res) => {
  try {
    const rows = database.prepare(locationsModel.getAllLocations).all();
    const mapPoints = rows.map(row => {
      const coords = JSON.parse(row.coordinates);
      let role = row.role;
      if (!role) {
        const user = database.prepare('SELECT role FROM users WHERE user_id = ?').get(row.user_id);
        role = user?.role ?? null;
      }

      return {
        user_id: row.user_id,
        role,
        time: row.time,
        lat: dmsToDecimal(coords.Latitude.Degrees, coords.Latitude.Minutes, coords.Latitude.Seconds),
        lng: dmsToDecimal(coords.Longitude.Degrees, coords.Longitude.Minutes, coords.Longitude.Seconds)
      };
    });
    console.log(mapPoints);
    res.json(mapPoints);
  } catch (err) {
    console.error("Error in getAllLocations:", err);
    res.status(500).json({ error: "Error fetching locations" });
  }
},
addLocations: async (req, res) => {
    const { user_id, time: requestTime, coordinates, Coordinates } = req.body;
    const coords = coordinates ?? Coordinates;
    const userId = user_id?.toString();
    let time = requestTime;
    const currentTime = new Date().toISOString();
    if (!userId || !coords) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }
    if (!time) {
        time = currentTime;
    }
    try {
      const result = database.prepare(locationsModel.addLocations).run(userId, time, JSON.stringify(coords));
      if (!result || result.changes === 0) {
        return res.status(500).json({ error: "Error adding location" });
      }
      res.status(201).json({ message: "location successfully", userId });
    } catch (err) {
      console.error("Error adding the location to the database:", err);
      res.status(500).json({ error: "Error adding the location" });
    }
}
};
export default locationsController;