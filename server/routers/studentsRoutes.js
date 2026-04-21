import express from "express";
import usersController from "../controllers/usersController.js";
import studentsController from "../controllers/studentsController.js"
const studentsRouter = express.Router();
// studentsRouter.get("/getStudentById/:userId", usersController.getUserById);
studentsRouter.get("/getAllStudents", studentsController.getAllStudents);
studentsRouter.post("/register", usersController.register);
//studentsRouter.post("/login", usersController.login);
export default studentsRouter;
