import express from "express";
import userController from "../../controllers/user";
import jwtController from '../../security/jwtcontroller'

let userRouter = express.Router();

userRouter
  .route('/users')
  .get(jwtController.validateToken, userController.getUsers)
  .post(userController.createUser);

userRouter
  .route('/login')
  .post(userController.login);

userRouter.route('/users/:username').get(userController.getUser);

export default userRouter;
