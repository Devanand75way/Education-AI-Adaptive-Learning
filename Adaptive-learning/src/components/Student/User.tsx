import React, { useState } from "react";
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Avatar, Box, Button, Modal
} from "@mui/material";
import { motion } from "framer-motion";
import { Navbar } from "../Hero-Section/Hero-section";
import { useAppSelector } from "../../store/store";
import { useGetFeedbackReportsQuery, useGetModalFeedbackReportsMutation } from "../../services/api";

const student = {
  name: "Test User",
  email: "testUser@example.com",
  phone: "+1 234 567 890",
  avatar: "/avatar.jpg",
};

const MotionBox = motion(Box);

const ViewCoursesPage: React.FC = () => {
  const [appliedCourses, setAppliedCourses] = React.useState([{}]);
  const { userId } = useAppSelector((state) => state.auth);
  const { data: FeedbackData } = useGetFeedbackReportsQuery({ userId });
  const [getModalfeedback] = useGetModalFeedbackReportsMutation();
  const [openModal, setOpenModal] = useState(false);
  const [feedbackResponse, setFeedbackResponse] = useState<any>(null);

  React.useEffect(() => {
    setAppliedCourses(FeedbackData?.data);
  }, [FeedbackData]);

  const HandleFeedback = async (course: any) => {
    try {
      const data = {
        Time_Spent: course.timeSpent || 0,
        Attempts: course.attempts || 0,
        Difficulty_Numeric: course.quiz?.difficultyNumeric || 0,
        Accuracy: course.accuracy || 0,
        Avg_Time_Spent: course.avgTimeSpent || 0,
        topic_name: course.quiz?.topicName || "Unknown",
      };
      const result = await getModalfeedback(data).unwrap();
      console.log(result);
      setFeedbackResponse(result);
      setOpenModal(true);
    } catch (error) {
      console.error("Failed to submit feedback report: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Student Applied Courses
          </Typography>
        </MotionBox>

        <MotionBox initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2, mb: 3, borderRadius: 3 }}>
            <Avatar src={student.avatar} alt={student.name} sx={{ width: 80, height: 80, mr: 2 }} />
            <CardContent>
              <Typography variant="h6">{student.name}</Typography>
              <Typography variant="body2" color="textSecondary">Email: {student.email}</Typography>
              <Typography variant="body2" color="textSecondary">Phone: {student.phone}</Typography>
            </CardContent>
          </Card>
        </MotionBox>

        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Topic Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Difficulty</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Attempted At</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Attempted</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Feedback</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appliedCourses && appliedCourses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{course.quiz?.topicName}</TableCell>
                    <TableCell>{course.quiz?.difficulty}</TableCell>
                    <TableCell>{new Date(course.quizAttempt?.attemptedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{course.attempts}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ borderRadius: 5, marginRight: 2 }}
                        onClick={() => HandleFeedback(course)}
                      >
                        Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MotionBox>
      </Container>

      {/* Feedback Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Feedback Report</Typography>
          {feedbackResponse ? (
            <>
              <Typography variant="body1">Feedback: {feedbackResponse.feedback}</Typography>
              <Typography variant="body1">Prediction: {feedbackResponse.prediction}</Typography>
              {feedbackResponse.weak_topics.length > 0 && (
                <Typography variant="body1">Weak Topics: {feedbackResponse.weak_topics.join(", ")}</Typography>
              )}
            </>
          ) : (
            <Typography variant="body1">Loading feedback...</Typography>
          )}
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => setOpenModal(false)}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default ViewCoursesPage;