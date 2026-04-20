import express from "express";

const teachersRouter = express.Router();
teachersRouter.get("/getUserById/:userId", usersController.getUserById);
teachersRouter.post("/register", usersController.register);
teachersRouter.post("/login", usersController.login);
export default teachersRouter;
