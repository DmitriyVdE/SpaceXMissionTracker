import express from "express";
import userController from "../../controllers/user";
import securityUtils from '../../security/utils'

let userRouter = express.Router();

userRouter
  .route('/users')
  .get(securityUtils.validateToken, userController.getUsers)
  .post(userController.createUser);

userRouter
  .route('/login')
  .post(userController.login);

userRouter.route('/users/:username').get(userController.getUser);

export default userRouter;
