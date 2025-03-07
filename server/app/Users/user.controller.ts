import { Request , Response } from "express";
import * as userServices from "./user.services"
import { CreateResponse } from "../comman/helper/helper.reponse";

export const create = async (req: Request, res: Response) => {
    const result = await userServices.create(req.body);
    res.send(CreateResponse(result, "User created successfully"))
}

export const login = async (req: Request, res: Response) => {
     const result = await userServices.login(req.body);
     res.send(CreateResponse(result, "User logged in successfully"))
}