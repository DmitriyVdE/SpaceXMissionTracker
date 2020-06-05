const debug = require("debug")("server:debug");
import bcrypt from "bcrypt";
import User from "../models/user";
import jwtController from "../security/jwtcontroller";
import dotenv from "dotenv";

dotenv.config();

async function register(req, res) {
  let result = {};

  try {
    const new_user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: "normal",
      firstname: req.body.firstname != undefined ? req.body.firstname : null,
      lastname: req.body.lastname != undefined ? req.body.lastname : null,
    });

    new_user.save((err, user) => {
      if (!err) {
        result.status = 201;
        result.result = user;
        result.result.password = null;
        result.token = jwtController.createToken(user.username, user.role);
      } else {
        debug(err);
        result.status = 500;
        result.error = err;
      }
      res.status(result.status).send(result);
    });
  } catch (err) {
    debug(err);
    result.status = 500;
    result.error = err;
    res.status(result.status).send(result);
  }
}

async function login(req, res) {
  let result = {};

  try {
    const { username, password } = req.body;

    await User.findOne({ username: username }, (err, user) => {
      if (!err && user) {
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              result.token = jwtController.createToken(
                user.username,
                user.role
              );
              result.status = 200;
              result.result = user;
              result.result.password = null;
            } else {
              result.status = 401;
              result.error = "Authentication error";
            }
            res.status(result.status).send(result);
          })
          .catch((err) => {
            debug(err);
            result.status = 500;
            result.error = err;
            res.status(result.status).send(result);
          });
      } else {
        result.status = 404;
        result.error = "User not found.";
        res.status(result.status).send(result);
      }
    });
  } catch (err) {
    debug(err);
    result.status = 500;
    result.error = err;
    res.status(result.status).send(result);
  }
}

// TODO: TEST + Maybe limit results?
async function searchUser(req, res) {
  let result = {};

  try {
    const payload = req.decoded;

    if (payload) {
      if (payload.role === "admin") {
        User.find(
          { username: { $regex: req.params.string, $options: "i" } },
          "username -_id",
          (err, found) => {
            if (!err) {
              result.status = 200;
              result.result = found;
              result.result.password = null;
            } else {
              debug(err);
              result.status = 500;
              result.error = err;
            }
            res.status(result.status).send(result);
          }
        );
      } else {
        result.status = 403;
        result.error = "Access denied";
        res.status(result.status).send(result);
      }
    } else {
      result.status = 401;
      result.error = "Authentication error";
      res.status(result.status).send(result);
    }
  } catch (err) {
    debug(err);
    result.status = 500;
    result.error = err;
    res.status(result.status).send(result);
  }
}

// Additional
async function getUsers(req, res) {
  let result = {};
  try {
    const payload = req.decoded;
    if (payload && payload.role === "admin") {
      User.find({}, (err, users) => {
        if (!err) {
          result.status = 200;
          result.error = err;
          result.result = users;
        } else {
          debug(err);
          result.status = 500;
          result.error = err;
        }
        res.status(result.status).send(result);
      });
    } else {
      result.status = 401;
      result.error = "Authentication error";
      res.status(result.status).send(result);
    }
  } catch (err) {
    debug(err);
    result.status = 500;
    result.error = err;
    res.status(result.status).send(result);
  }
}

async function getUser(req, res) {
  let result = {};

  try {
    const payload = req.decoded;

    if (payload) {
      if (
        payload.role === "admin" ||
        (payload.role === "normal" && payload.username === req.params.username)
      ) {
        const found_user = await User.findOne({
          username: req.params.username,
        }).exec();

        if (found_user) {
          result.status = 200;
          result.result = found_user;
          result.result.password = null;
        } else {
          result.status = 404;
          result.error = "User not found.";
        }
        res.status(result.status).send(result);
      } else {
        result.status = 403;
        result.error = "Access denied";
        res.status(result.status).send(result);
      }
    } else {
      result.status = 401;
      result.error = "Authentication error";
      res.status(result.status).send(result);
    }
  } catch (err) {
    debug(err);
    result.status = 500;
    result.error = err;
    res.status(result.status).send(result);
  }
}

async function createUser(req, res) {
  let result = {};

  try {
    const payload = req.decoded;

    if (payload) {
      if (payload.role === "admin") {
        let new_user = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          firstname:
            req.body.firstname != undefined ? req.body.firstname : null,
          lastname: req.body.lastname != undefined ? req.body.lastname : null,
        });

        new_user.save((err, user) => {
          if (!err) {
            result.status = 201;
            result.result = user;
            result.result.password = null;
          } else {
            debug(err);
            result.status = 500;
            result.error = err;
          }
          res.status(result.status).send(result);
        });
      } else {
        result.status = 403;
        result.error = "Access denied";
        res.status(result.status).send(result);
      }
    } else {
      result.status = 401;
      result.error = "Authentication error";
      res.status(result.status).send(result);
    }
  } catch (err) {
    debug(err);
    result.status = 500;
    result.error = err;
    res.status(result.status).send(result);
  }
}

// TODO (maybe): add coupons, favStores and ownerOf to editUser
//               This will require the addition of arraychecking for all three arrays
//               Except maybe coupons since this array has seperate functions
async function editUser(req, res) {
  let result = {};

  try {
    const payload = req.decoded;

    if (payload) {
      if (payload.role === "admin") {
        User.findOne({ username: req.body.username }, (err, user) => {
          if (!err) {
            user.role = req.body.role != undefined ? req.body.role : user.role;
            user.email =
              req.body.email != undefined ? req.body.email : user.email;
            user.phone =
              req.body.phone != undefined ? req.body.phone : user.phone;
            user.firstname =
              req.body.firstname != undefined
                ? req.body.firstname
                : user.firstname;
            user.lastname =
              req.body.lastname != undefined
                ? req.body.lastname
                : user.lastname;

            user.save((err, user) => {
              if (!err) {
                result.status = 200;
                result.result = user;
                result.result.password = null;
              } else {
                debug(err);
                result.status = 500;
                result.error = err;
              }
              res.status(result.status).send(result);
            });
          } else {
            result.status = 404;
            result.error = "User not found";
            res.status(result.status).send(result);
          }
        });
      } else if (
        payload.role === "normal" &&
        payload.username === req.body.username
      ) {
        User.findOne({ username: req.body.username }, (err, user) => {
          if (!err) {
            user.email =
              req.body.email != undefined ? req.body.email : user.email;
            user.phone =
              req.body.phone != undefined ? req.body.phone : user.phone;
            user.firstname =
              req.body.firstname != undefined
                ? req.body.firstname
                : user.firstname;
            user.lastname =
              req.body.lastname != undefined
                ? req.body.lastname
                : user.lastname;

            user.save((err, user) => {
              if (!err) {
                result.status = 200;
                result.result = user;
                result.result.password = null;
              } else {
                debug(err);
                result.status = 500;
                result.error = err;
              }
              res.status(result.status).send(result);
            });
          } else {
            result.status = 404;
            result.error = "User not found";
            res.status(result.status).send(result);
          }
        });
      } else {
        result.status = 403;
        result.error = "Access denied";
        res.status(result.status).send(result);
      }
    } else {
      result.status = 401;
      result.error = "Authentication error";
      res.status(result.status).send(result);
    }
  } catch (err) {
    debug(err);
    result.status = 500;
    result.error = err;
    res.status(result.status).send(result);
  }
}

async function deleteUser(req, res) {
  let result = {};

  try {
    const payload = req.decoded;

    if (payload) {
      if (payload.role === "admin") {
        User.findOne({ username: req.body.username }, (err, user) => {
          if (!err) {
            if (user != undefined) {
              user.delete((err, user) => {
                if (!err) {
                  result.status = 200;
                  result.message = `The user "${user.username}" has been deleted`;
                  result.result = user;
                  result.result.password = null;
                } else {
                  debug(err);
                  result.status = 500;
                  result.error = err;
                }
                res.status(result.status).send(result);
              });
            } else {
              result.status = 404;
              result.error = "User not found";
              res.status(result.status).send(result);
            }
          } else {
            debug(err);
            result.status = 500;
            result.error = err;
            res.status(result.status).send(result);
          }
        });
      } else if (
        payload.role === "normal" &&
        payload.username === req.body.username
      ) {
        User.findOne({ username: payload.username }, (err, user) => {
          if (!err) {
            if (user != undefined) {
              user.delete((err, user) => {
                if (!err) {
                  result.status = 200;
                  result.message = `The user "${user.username}" has been deleted`;
                  result.result = user;
                  result.result.password = null;
                } else {
                  debug(err);
                  result.status = 500;
                  result.error = err;
                }
                res.status(result.status).send(result);
              });
            } else {
              result.status = 404;
              result.error = "User not found";
              res.status(result.status).send(result);
            }
          } else {
            result.status = 404;
            result.error = "User not found";
            res.status(result.status).send(result);
          }
        });
      } else {
        result.status = 403;
        result.error = "Access denied";
        res.status(result.status).send(result);
      }
    } else {
      result.status = 401;
      result.error = "Authentication error";
      res.status(result.status).send(result);
    }
  } catch (err) {
    debug(err);
    result.status = 500;
    result.error = err;
    res.status(result.status).send(result);
  }
}

export default {
  register,
  login,
  searchUser,
  getUser,
  getUsers,
  createUser,
  editUser,
  deleteUser,
};
