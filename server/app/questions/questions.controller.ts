import { Request , Response } from "express";
import * as questionsServices from "./question.service"
import { CreateResponse } from "../comman/helper/helper.reponse";

export const getQuestions = async (req : Request, res: Response) => {
     const { topic } = req.params;
     const questions = await questionsServices.getQuestions(topic);
     res.send(CreateResponse(questions, "Questions retrieved successfully"))
}

export const getUniqueTopics = async (req : Request, res: Response) => {
     const uniqueTopics = questionsServices.getUniqueTopics;
     res.send(CreateResponse(uniqueTopics, "Unique topics retrieved successfully"))
}

export const getQuizQuestions = async (req : Request, res: Response) => {
     const { topic } = req.params;
     const { userId } = req.body;
     const questions = await questionsServices.getQuizQuestions(topic, userId);
     res.send(CreateResponse(questions, "Questions retrieved successfully"))
}