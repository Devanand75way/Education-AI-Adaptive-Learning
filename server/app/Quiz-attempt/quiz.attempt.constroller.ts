import { CreateResponse } from "../comman/helper/helper.reponse";
import * as QuizAttempt from "./quiz.attempt.services";
import { Request, Response } from "express";

export const createQuizAttempt = async (req: Request, res: Response) => {
    console.log(req.body)
    const attempt = await QuizAttempt.createQuizAttempt(req.body);
    res.send(CreateResponse(attempt,"Quiz Attempt successfully created"));
};

export const getQuizAttemptsByUser = async (req :Request, res : Response) => {
    const { userId } = req.params;
    const attempts = await QuizAttempt.getQuizAttemptsByUser(userId);
    res.send(CreateResponse(attempts,"Quiz Attempt successfully"))
};

