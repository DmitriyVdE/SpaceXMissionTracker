import express from "express";
import faqController from "../controllers/faq";
import jwtController from "../security/jwtcontroller";

let faqRouter = express.Router();

faqRouter
  .route("/faq")
  .get(faqController.getFaq)

faqRouter
  .route("/faq/search/:string")
  .get(faqController.searchFaq);

faqRouter
  .route("/faq/create")
  .post(jwtController.validateToken, faqController.createFaq)

faqRouter
  .route("/faq/edit/:id")
  .put(jwtController.validateToken, faqController.editFaq)

faqRouter
  .route("/faq/delete/:id")
  .delete(jwtController.validateToken, faqController.deleteFaq);


export default faqRouter;
