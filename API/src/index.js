const debug = require("debug")("server:debug");
import dotenv from "dotenv";
import config from "config";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";

dotenv.config();

mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_PASS +
    "@" +
    process.env.DB_URL +
    "?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

// callback when connection to mongodb is open
mongoose.connection.once("open", function () {
  debug("MongoDB database connection established successfully");
});

const app = express();
// support json encoded bodies in the req
app.use(bodyParser.urlencoded({ extended: true }));

//sets the limit of json bodies in the req body.
app.use(bodyParser.json());

app.use("/api/v1/", routes);

const listen = app.listen(config.get("port"), () => {
  debug(
    `server is running on port ${config.get("port")} and in ${config.get(
      "name"
    )} mode`
  );
  console.log(
    `server is running on port ${config.get("port")} and in ${config.get(
      "name"
    )} mode`
  );
});

export default app;
module.exports.port = listen.address().port;
