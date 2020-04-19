import express from 'express';
const router = express.Router();

// TODO: Add controllers and find out how to import them and link routes to controller functions.
import user from '../models/user';

router.get('/users', async(req,res) => {
  try {
    const users = await user.find({}).exec();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({message:'Internal server error'})
  }
})

module.exports = router;