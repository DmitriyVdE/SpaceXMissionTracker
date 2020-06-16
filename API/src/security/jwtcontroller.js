import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

function createToken(username, role) {
  const payload = { username: username, role: role };
  const options = {
    expiresIn: "7d",
    issuer: "https://localhost:3100",
  };
  const secret = "j6gbbO8zWI1rsb5UlHxEluRpyptMEuSv8phs9sc5DSaS4hql2YNE3TM";
  const token = jwt.sign(payload, secret, options);

  return token;
}

async function validateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  let result;
  if (authorizationHeader) {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const options = {
      expiresIn: "2d",
      issuer: "https://spacexmt.ew.r.appspot.com",
    };
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, "j6gbbO8zWI1rsb5UlHxEluRpyptMEuSv8phs9sc5DSaS4hql2YNE3TM", options);

      // Let's pass back the decoded token to the request object
      req.decoded = result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      result = {
        error: "Authentication error. Invalid token.",
        status: 401,
      };
      res.status(401).send(result);
    }
  } else {
    result = {
      error: "Authentication error. Token required.",
      status: 401,
    };
    res.status(401).send(result);
  }
}

export default {
  createToken,
  validateToken,
};
