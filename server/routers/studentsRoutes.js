import express from "express";

const studentsRouter = express.Router();
studentsRouter.get("/getStudentById/:userId", usersController.getUserById);
studentsRouter.get("/getStudents", usersController.getUserById);
studentsRouter.post("/register", usersController.register);
studentsRouter.post("/login", usersController.login);
export default studentsRouter;
