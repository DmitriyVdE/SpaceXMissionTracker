const debug = require("debug")("server:debug");
import dotenv from "dotenv";
import config from "config";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";

dotenv.config();

mongoose.connect(
  "mongodb+srv://dbAPI:tQUkwdKHNOwKQy4Y@main-kzg1x.gcp.mongodb.net/sxmtdevdb?retryWrites=true&w=majority",
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

const PORT = process.env.PORT || 8080;

const listen = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

export default app;
module.exports.port = listen.address().port;
