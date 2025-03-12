import {Router} from "express"
const router = Router();
import * as textClassifyController from "./text.classify.controller"


router.post("/simplify" , textClassifyController.SimplifyText)

export default router;