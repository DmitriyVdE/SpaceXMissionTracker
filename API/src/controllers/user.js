import mongoose from 'mongoose';
import user from '../models/user';

async function get_users(req, res) {
  try {
    const users = await user.find({}).exec();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({message:'Internal server error'})
  }
}

async function get_user(req, res) {
  try {
    const found_user = await user.findOne({ username: req.params.username }).exec();
    
    if (found_user) {
      found_user.password = null
      res.status(200).send(found_user);
    } else {
      res.status(404).send({message:'User not found.'});
    }
  } catch (error) {
    res.status(500).send({message:'Internal server error'})
  }
}

async function create_user(req, res) {
  try {
    let new_user = new user({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    })

    await new_user.save()
    
    new_user.password = null

    res.status(200).send(new_user);
  } catch (error) {
    console.log(error)
    res.status(500).send({message:'Internal server error'})
  }
}

module.exports = {
  get_users,
  get_user,
  create_user
}