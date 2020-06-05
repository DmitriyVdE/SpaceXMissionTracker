const debug = require("debug")("server:debug");
import Faq from "../models/faq";
import dotenv from "dotenv";

dotenv.config();

async function getFaq(req, res) {
  let result = {};

  try {
    Faq.find({}, (err, found) => {
      if (!err) {
        result.status = 200;
        result.result = found;
      } else {
        debug(err);
        result.status = 404;
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

// TODO: TEST + Maybe limit results?
async function searchFaq(req, res) {
  let result = {};

  try {
    let searchString = new RegExp(req.params.string, "i");
    Faq.find(
      {
        $and: [
          {
            $or: [{ question: searchString }, { answer: searchString }],
            qApproved: true,
            aApproved: true,
            answered: true,
          },
        ],
      },
      (err, found) => {
        if (!err) {
          result.status = 200;
          result.result = found;
        } else {
          debug(err);
          result.status = 500;
          result.error = err;
        }
        res.status(result.status).send(result);
      }
    );
  } catch (err) {
    debug(err);
    result.status = 500;
    result.error = err;
    res.status(result.status).send(result);
  }
}

async function createFaq(req, res) {
  let result = {};

  try {
    const payload = req.decoded;

    if (payload) {
      let new_faq = new Faq({
        question: req.body.question,
        answer: req.body.answer != null ? req.body.answer : "",
      });

      new_faq.save((err, saved) => {
        if (!err) {
          result.status = 201;
          result.result = saved;
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

async function editFaq(req, res) {
  let result = {};

  try {
    const payload = req.decoded;

    if (payload) {
      if (payload.role === "admin" || payload.role === "moderator") {
        Faq.findById(req.params.id, (err, found) => {
          if (!err) {
            found.question =
              req.body.question != null ? req.body.question : found.question;
            found.qApproved =
              req.body.qApproved != null ? req.body.qApproved : found.qApproved;
            found.answer =
              req.body.answer != null ? req.body.answer : found.answer;
            found.aApproved =
              req.body.aApproved != null ? req.body.aApproved : found.aApproved;
            found.answered =
              req.body.answered != null ? req.body.answered : found.answered;

            found.save((err, saved) => {
              if (!err) {
                result.status = 200;
                result.result = saved;
              } else {
                debug(err);
                result.status = 500;
                result.error = err;
              }
              res.status(result.status).send(result);
            });
          } else {
            debug(err);
            result.status = 404;
            result.error = "Faq not found";
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

async function deleteFaq(req, res) {
  let result = {};

  try {
    const payload = req.decoded;

    if (payload) {
      if (payload.role === "admin" || payload.role === "moderator") {
        Faq.findById(req.body.id , (err, found) => {
          if (!err) {
            if (found != undefined) {
              found.delete((err, deleted) => {
                if (!err) {
                  result.status = 200;
                  result.message = `The question "${deleted.question}" has been deleted`;
                  result.result = deleted;
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

// Add helpfull or not + feedback entry if available
async function faqAddFeedback(req, res) {}

export default {
  searchFaq,
  getFaq,
  createFaq,
  editFaq,
  deleteFaq,
  faqAddFeedback,
};
