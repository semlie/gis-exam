import express from "express";
import classesController from "../controllers/classesController.js";
const classesRouter = express.Router();
classesRouter.get("/getAllClasses", classesController.getAllClasses);
classesRouter.post("/addClass", classesController.addClass);
export default classesRouter;