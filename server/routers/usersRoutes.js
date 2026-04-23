import express from "express";
import usersController from "../controllers/usersController.js";
const usersRouter = express.Router();
usersRouter.get("/getAllStudents", usersController.getAllStudents);
usersRouter.post("/register", usersController.register);
usersRouter.post("/login",usersController.login);
export default usersRouter;
