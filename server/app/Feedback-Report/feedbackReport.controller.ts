import { Request , Response } from "express";
import * as feedbackreport from "./feedbackRepoer.service"
import { CreateResponse } from "../comman/helper/helper.reponse";

export const createFeedbackReport = async (req: Request, res: Response) => {
    const report = await feedbackreport.create(req.body);
    res.send(CreateResponse(report, "feedbackReport created successfully"));
};

export const getFeedBackReport = async (req: Request, res: Response) => {
    const { userId } = req.params;
    console.log("userId", userId);
    const reports = await feedbackreport.getFeedBackReport(userId);
    res.send(CreateResponse(reports, "feedbackReport retrieved successfully"));
}