import Router from "express";
const router = Router();

import * as courseController from "./course.controller";

router
  .post("/", courseController.createCourse)
  .get("/", courseController.getCourses);

export default router;
