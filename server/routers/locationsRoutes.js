import express from "express";
import locationsController from "../controllers/locationsController.js";
import { verifyToken, isTeacher } from "../middleware/auth.js";
const locationsRouter = express.Router();
locationsRouter.get("/getAllLocations", locationsController.getAllLocations);
locationsRouter.post("/addLocations", locationsController.addLocations);
locationsRouter.get("/getLocationsByClassId/:class_id",verifyToken, isTeacher, locationsController.getLocationsByClassId);
locationsRouter.get("/getAllFarStudents/:class_id/:user_id", verifyToken, isTeacher, locationsController.getAllFarStudents);
export default locationsRouter;
