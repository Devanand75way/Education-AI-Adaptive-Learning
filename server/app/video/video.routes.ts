import express from "express";
import * as VideoController from "./video.controller"

const router = express.Router();

router
  .post("/", VideoController.createVideo)
  .get("/course/:courseId", VideoController.getVideosByCourse)
  // .get("/:id", VideoController.getVideoById);

export default router;