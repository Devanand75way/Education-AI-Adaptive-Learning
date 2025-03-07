import { Request, Response } from "express";
import * as videoWatchController from "./videowatch.services"
import { CreateResponse } from "../comman/helper/helper.reponse";

export const recordWatch = async (req : Request, res : Response) => {
    const { userId, videoId } = req.body;
    const watchRecord = await videoWatchController.recordWatch(userId, videoId);
    res.send(CreateResponse(watchRecord, "watch record successfully"))
};

export const getWatchedVideosByUser = async (req : Request, res : Response) => {
    const { userId } = req.params;
    const watchedVideos = await videoWatchController.getWatchedVideosByUser(userId);
    res.send(CreateResponse(watchedVideos, "watch video successfully successfully"));
};
