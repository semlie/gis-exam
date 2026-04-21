import database from '../db/initDB.js';
import locationsModel from '../models/locationsModel.js'
// פונקציה להמרת DMS (מעלות, דקות, שניות) לעשרוני
function dmsToDecimal(d, m, s) {
    return parseFloat(d) + (parseFloat(m) / 60) + (parseFloat(s) / 3600);
}
const locationsController = {
// שליפת כל הנקודות מהמסד
getAllLocations: async (req, res) =>
database.all(locationsModel.getAllLocations, [], (err, rows) => {
    const mapPoints = rows.map(row => {
        const coords = JSON.parse(row.coordinates);
        return {
            id: row.id,
            time: row.time,
            lat: dmsToDecimal(coords.Latitude.Degrees, coords.Latitude.Minutes, coords.Latitude.Seconds),
            lng: dmsToDecimal(coords.Longitude.Degrees, coords.Longitude.Minutes, coords.Longitude.Seconds)
        };
    });
    // את mapPoints את שולחת ל-Frontend (למשל דרך API או רנדור בדף)
    console.log(mapPoints); 
})
//addLocations: 
};
export default locationsController;