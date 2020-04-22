import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Preferences from '../models/preferences'
import dotenv from "dotenv";

dotenv.config();

async function getUsers(req, res) {
  try {
    let result = {};
    const payload = req.decoded;
    // TODO: Log the payload here to verify that it's the same payload
    //  we used when we created the token
    console.log('PAYLOAD', payload);
    if (payload && payload.role === 'admin') {
      User.find({}, (err, users) => {
        if (!err) {
          result.status = 202;
          result.error = err;
          result.result = users;
        } else {
          result.status = 500;
          result.error = err;
        }
        res.status(result.status).send(result);
      });
    } else {
      result.status = 401;
      result.error = `Authentication error`;
      res.status(result.status).send(result);
    }
  } catch (err) {
    console.log(err)
    result.status = 500;
    result.error = err;
    res.status(result.status).send(result);
  }
}

async function getUser(req, res) {
  try {
    const found_user = await User
      .findOne({ username: req.params.username })
      .exec();

    if (found_user) {
      found_user.password = null;
      res.status(200).send(found_user);
    } else {
      res.status(404).send({ message: "User not found." });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: "Internal server error" });
  }
}

async function createUser(req, res) {
  try {
    let new_user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      firstname: (req.body.firstname != undefined ? req.body.firstname : null),
      lastname: (req.body.lastname != undefined ? req.body.lastname : null),
    });

    await new_user.save((err, new_user) => {
      let result = {};

      if (!err) {
        result.status = 201;
        result.result = new_user;
      } else {
        result.status = 500;
        result.error = err;
      }
      
      // TODO: Remove user info from response
      res.status(result.status).send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    await User.findOne({username: username}, (err, user) => {
      let result = {};

      if (!err && user) {
        // We could compare passwords in our model instead of below
        bcrypt.compare(password, user.password).then(match => {
          if (match) {
            const payload = { user: user.username,  role: user.role };
            const options = { expiresIn: '2d', issuer: 'https://spacexmt.com' };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, options);

            result.token = token;
            result.status = 202;
            // TODO: Remove user info from response
            result.result = user;
          } else {
            result.status = 401;
            result.error = 'Authentication error';
          }
          res.status(result.status).send(result);
        }).catch(err => {
          result.status = 500;
          result.error = err;
          res.status(result.status).send(result);
        });
      } else {
        result.status = 404;
        result.error = err;
        res.status(result.status).send(result);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
}

export default {
  getUsers,
  getUser,
  createUser,
  login,
};
