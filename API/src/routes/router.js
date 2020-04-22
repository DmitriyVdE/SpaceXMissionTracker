import express from "express";

import user from '../models/user';
import userController from '../controllers/user';

let router = express.Router()

// Set default API response
router
  .get('/', function (req, res) {
    res.json({
      status: 'API is Live!',
      message: 'Welcome to the \'SpaceX Mission Tracker\' API!'
    })
  })

router.route('/users')
  .get(userController.getUsers)
  .post(userController.createUser)

router.route('/users/:username')
  .get(userController.getUser)

export default router