import express from "express";
import userRouter from "./user";
import faqRouter from "./faq";

let router = express.Router();

// Set default API response
router.get("/", function (req, res, next) {
  res.json({
    status: "API is Live!",
    message: "Welcome to the 'SpaceX Mission Tracker' API!",
  });
});

router.use("/", userRouter);
router.use("/", faqRouter);

export default router;
