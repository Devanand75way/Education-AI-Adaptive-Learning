import { Router } from "express";
import * as QuizAttempt from "./quiz.attempt.constroller";
const router = Router();

router
  .post("/", QuizAttempt.createQuizAttempt)
  .get("/:userId", QuizAttempt.getQuizAttemptsByUser);

export default router;
