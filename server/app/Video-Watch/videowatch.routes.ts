import { Router } from "express";
import * as VideoWatchController from "./videowatch.controller";
const router = Router();

router
  .post("/", VideoWatchController.recordWatch)
  .get("/user/:userId", VideoWatchController.getWatchedVideosByUser);


  export default router;