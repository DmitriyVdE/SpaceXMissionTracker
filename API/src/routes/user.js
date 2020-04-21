import express from 'express';
const router = express.Router();

// TODO: Add controllers and find out how to import them and link routes to controller functions.
import user from '../models/user';
import user_controller from '../controllers/user';

router.route('/users')
  .get(user_controller.get_users)
  .post(user_controller.create_user)

router.route('/users/:username')
  .get(user_controller.get_user)

/*
router.get('/users', async(req,res) => {
  try {
    const users = await user.find({}).exec();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({message:'Internal server error'})
  }
})
*/

module.exports = router;