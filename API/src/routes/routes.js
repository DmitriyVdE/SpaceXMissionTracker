import express from "express";

import userRouter from "./users/user";

let router = express.Router();

// Set default API response
router.get("/", function (req, res, next) {
  res.json({
    status: "API is Live!",
    message: "Welcome to the 'SpaceX Mission Tracker' API!",
  });
});

router.use("/", userRouter);

export default router;
