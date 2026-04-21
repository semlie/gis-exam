import express from "express";
import locationsController from "../controllers/locationsController.js";
const locationsRouter = express.Router();
// studentsRouter.get("/getStudentById/:userId", usersController.getUserById);
locationsRouter.get("/getAllLocations", locationsController.getAllLocations);
locationsRouter.post("/addLocations", locationsController.addLocations);
//studentsRouter.post("/login", usersController.login);
export default locationsRouter;
