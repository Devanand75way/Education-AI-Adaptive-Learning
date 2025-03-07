import Router from "express";
const router = Router();

import * as quizController from "./quiz.controller";

router
  .post("/", quizController.createQuiz)
  .get("/:courseId", quizController.getQuizzesByCourse);

export default router;
