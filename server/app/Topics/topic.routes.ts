import { Router } from "express";
const router = Router();

import * as topicControllers from "./topic.controller";

router
  .post("/create-topic", topicControllers.create)
  .get("/", topicControllers.getAllTopics)
  .get("/:id", topicControllers.getTopics)
  .put("/:id/update-content", topicControllers.updateContent);

export default router;
