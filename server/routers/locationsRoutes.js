import express from "express";
import locationsController from "../controllers/locationsController.js";
const locationsRouter = express.Router();
locationsRouter.get("/getAllLocations", locationsController.getAllLocations);
locationsRouter.post("/addLocations", locationsController.addLocations);
export default locationsRouter;
