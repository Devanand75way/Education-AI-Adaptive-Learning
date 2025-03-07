import { CreateResponse } from "../comman/helper/helper.reponse";
import * as quizServices from "./quiz.service"
import { Request , Response } from "express";

export const createQuiz = async (req : Request, res: Response) => {
    const {courseId, topicName , difficulty} = req.body
    const quiz = await quizServices.createQuiz(courseId, topicName, difficulty);
    res.send(CreateResponse(quiz, "success message for quiz created "))
};

export const getQuizzesByCourse = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    console.log('Id', courseId)
    const quizzes = await quizServices.getQuizzesByCourse(courseId);
    res.send(CreateResponse(quizzes, "success message for quiz"));
};

