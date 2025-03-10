import { Router } from "express";
import * as FeedBackEnrollMent from "./feedbackReport.controller"
const router = Router();

router
  .post("/user-feedback", FeedBackEnrollMent.createFeedbackReport)
  .get("/:userId", FeedBackEnrollMent.getFeedBackReport);


  export default router;