import database from '../db/initDB.js';
import locationsModel from '../models/locationsModel.js'
import usersModel from '../models/usersModel.js'
import { getIo } from '../sockets/appSocket.js';
// פונקציה להמרת DMS (מעלות, דקות, שניות) לעשרוני
function dmsToDecimal(d, m, s) {
    return parseFloat(d) + (parseFloat(m) / 60) + (parseFloat(s) / 3600);
}
function calculateAirDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // רדיוס כדור הארץ בקילומטרים
    
    // המרה לרדיאנים
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    
    return distance; // תוצאה בקילומטרים
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

      const user = database.prepare(usersModel.getUserById).get(userId);
      const coordsObj = coords;
      const lat = dmsToDecimal(coordsObj.Latitude.Degrees, coordsObj.Latitude.Minutes, coordsObj.Latitude.Seconds);
      const lng = dmsToDecimal(coordsObj.Longitude.Degrees, coordsObj.Longitude.Minutes, coordsObj.Longitude.Seconds);
      const newLocation = {
        user_id: userId,
        role: user?.role ?? null,
        time,
        lat,
        lng
      };

      const io = getIo();
      if (io) {
        io.emit("studentLocationUpdate", newLocation);
      }

      res.status(201).json({ message: "location successfully", userId });
    } catch (err) {
      console.error("Error adding the location to the database:", err);
      res.status(500).json({ error: "Error adding the location" });
    }
},
getLocationsByClassId: async (req,res) =>{
  const class_id = req.params.class_id;
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
},
getAllFarStudents: async (req, res) => {
  const class_id = req.params.class_id;
  const teacher_id = req.params.user_id;

  if (!class_id) {
    return res.status(400).json({ error: "class_id is required" });
  }
  if (!teacher_id) {
    return res.status(400).json({ error: "teacher_id is required" });
  }

  try {
    const teacher = database.prepare(usersModel.getTeacherById).get(teacher_id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const teacherLocationRow = database.prepare(locationsModel.getLastLocationByUserId).get(teacher_id);
    if (!teacherLocationRow) {
      return res.status(404).json({ error: "Teacher location not found" });
    }

    const teacherCoords = JSON.parse(teacherLocationRow.coordinates);
    const teacherLat = dmsToDecimal(teacherCoords.Latitude.Degrees, teacherCoords.Latitude.Minutes, teacherCoords.Latitude.Seconds);
    const teacherLng = dmsToDecimal(teacherCoords.Longitude.Degrees, teacherCoords.Longitude.Minutes, teacherCoords.Longitude.Seconds);

    const studentRows = database.prepare(locationsModel.getLocationsByClassId).all(class_id);
    const farStudents = studentRows
      .map(row => {
        const coords = JSON.parse(row.coordinates);
        const lat = dmsToDecimal(coords.Latitude.Degrees, coords.Latitude.Minutes, coords.Latitude.Seconds);
        const lng = dmsToDecimal(coords.Longitude.Degrees, coords.Longitude.Minutes, coords.Longitude.Seconds);
        const distanceKm = calculateAirDistance(teacherLat, teacherLng, lat, lng);
        return {
          user_id: row.user_id,
          role: row.role,
          time: row.time,
          first_name: row.first_name,
          last_name: row.last_name,
          full_name: `${row.first_name} ${row.last_name}`,
          distance_km: Number(distanceKm.toFixed(2)),
          location_label: `${lat.toFixed(3).replace('.', ',')} , ${lng.toFixed(3).replace('.', ',')}`
        };
      })
      .filter(row => row.role === 'student' && row.user_id !== teacher_id)
      .filter(row => row.distance_km > 3);

    return res.json(farStudents);
  } catch (err) {
    console.error("Error in getAllFarStudents:", err);
    return res.status(500).json({ error: "Error fetching far students" });
  }
}
};
export default locationsController;