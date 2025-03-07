import { Router } from "express";
const router = Router();


import courseEnrollment  from "../Course-Enrollment/enroll.routes"
import Courses from "../courses/course.routes"
import FeedBackREport from "../Feedback-Report/feedbackReport.routes"
import Quiz from "../Quiz/quiz.routes"
import users from "../Users/user.routes"
import video from "../video/video.routes"
import videoWatched from "../Video-Watch/videowatch.routes"
import QuizAttempt from "../Quiz-attempt/quiz.attempt.routes"

router.use("/course-enrollment" ,courseEnrollment)
router.use("/courses" , Courses)
router.use("/feedback-report" , FeedBackREport)
router.use("/quiz" , Quiz)
router.use("/users" , users)
router.use("/video" , video)
router.use("/video-watch" , videoWatched)
router.use("/quiz-attempt" , QuizAttempt)


export default router;
