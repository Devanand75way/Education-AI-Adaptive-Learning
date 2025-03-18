import { Router } from "express"
import * as questionController from "./questions.controller"
import { catchError } from "../comman/middleware/catch-error";
const router = Router();

router
    .get('/topics', catchError, questionController.getUniqueTopics)
    .get('/:topic', catchError, questionController.getQuestions)
    .post('/:topic', catchError, questionController.getQuizQuestions)

export default router;