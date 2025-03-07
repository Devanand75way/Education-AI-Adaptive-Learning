import { Request , Response } from "express";
import * as feedbackreport from "./feedbackRepoer.service"
import { CreateResponse } from "../comman/helper/helper.reponse";

export const createFeedbackReport = async (req: Request, res: Response) => {
    const report = await feedbackreport.create(req.body);
    res.send(CreateResponse(report, "feedbackReport created successfully"));
};


