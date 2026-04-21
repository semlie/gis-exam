import express from "express";
import usersController from "../controllers/usersController.js";
const usersRouter = express.Router();
// studentsRouter.get("/getStudentById/:userId", usersController.getUserById);
usersRouter.get("/getAllStudents", usersController.getAllStudents);
usersRouter.post("/register", usersController.register);
//studentsRouter.post("/login", usersController.login);
export default usersRouter;
