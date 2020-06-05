import express from "express";
import userController from "../controllers/user";
import jwtController from "../security/jwtcontroller";

let userRouter = express.Router();

userRouter.route("/register").post(userController.register);

userRouter.route("/login").post(userController.login);

userRouter
  .route("/users/search/:string")
  .get(jwtController.validateToken, userController.searchUser);

userRouter
  .route("/users/create")
  .post(jwtController.validateToken, userController.createUser);

userRouter
  .route("/users/edit/:id")
  .put(jwtController.validateToken, userController.editUser)

userRouter
  .route("/users/delete/:id")
  .delete(jwtController.validateToken, userController.deleteUser);

userRouter
  .route("/user/:username")
  .get(jwtController.validateToken, userController.getUser);

export default userRouter;
