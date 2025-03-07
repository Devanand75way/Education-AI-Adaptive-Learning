import { Request ,Response } from "express";
import { CreateResponse } from "../comman/helper/helper.reponse";
import * as videoService from "./video.services"


export const createVideo = async (req: Request, res : Response) => {
    const video = await videoService.createVideo(req.body);
    res.send(CreateResponse(video, "Video created successfully"))
};

export const getVideosByCourse = async (req: Request, res : Response) => {
    const { courseId } = req.params;
    const videos = await videoService.getVideosByCourse(courseId);
   res.send(CreateResponse(videos, "Video retrieved successfully"))
};

export const getVideoById = async (req: Request, res : Response) => {
    const { id } = req.params;
    const video = await videoService.getVideoById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.send(CreateResponse(video,"Video fetched Successfully"))

};

