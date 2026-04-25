import database from '../db/initDB.js';
import locationsModel from '../models/locationsModel.js'
import usersModel from '../models/usersModel.js'
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
        const user = database.prepare(usersModel.getRoleById).get(row.user_id);
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
},
getLocationsByClassId: async (req,res) =>{
  const { class_id } = req.body;
  if (!class_id) {
    return res.status(400).json({ error: "class_id is required" });
  }
  try {
    const rows = database.prepare(locationsModel.getLocationsByClassId).all(class_id);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No locations found for this class" });
    }
    const mapPoints = rows.map(row => {
      const coords = JSON.parse(row.coordinates);
      return {
        user_id: row.user_id,
        role: row.role,
        time: row.time,
        lat: dmsToDecimal(coords.Latitude.Degrees, coords.Latitude.Minutes, coords.Latitude.Seconds),
        lng: dmsToDecimal(coords.Longitude.Degrees, coords.Longitude.Minutes, coords.Longitude.Seconds)
      };
    });
    return res.json(mapPoints);
  } catch (err) {
    console.error("Error getting locations from the database:", err);
    return res.status(500).json({ error: "Error getting locations" });
  }
}
};
export default locationsController;