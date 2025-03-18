import React, { useState, useEffect } from "react";
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Avatar, Box, Button, Modal, Grid
} from "@mui/material";
import { motion } from "framer-motion";
import { Navbar } from "../Hero-Section/Hero-section";
import { useAppSelector } from "../../store/store";
import { useGetFeedbackReportsQuery, useGetlearningReportQuery, useGetModalFeedbackReportsMutation } from "../../services/api";

import { Radar, Bar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const radarChartData = {
  labels: ["Attempts", "Correct Answers", "Accuracy", "Avg Time Spent", "Difficulty Level"],
  datasets: [
    {
      label: "Learning Performance",
      data: [
        "40",
        "20",
        "50%",
        "10m",
        "Medium",
      ],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
    },
  ],
};

const barChartData = {
  labels: ["Java Basics", "Java Collections", "Java Exceptions", "Java Multithreading", "Java OOP"],  // ✅ Wrap in an array
  datasets: [
    {
      label: "Attempts per Topic",
      data: [5, 8, 4, 6, 7],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};


const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};
const MotionBox = motion(Box);


const badgeLevels = {
  beginner: "/beg.png",
  intermediate: "/inter.png",
  advanced: "/pro.png",
};


// Dummy student details
const student = {
  name: "Test User",
  email: "testUser@example.com",
  phone: "+1 234 567 890",
  avatar: "/avatar.jpg",
  level: "advanced"
};

// Dummy Learning Track
const learningTrack = {
  total_attempts: 40,
  correct_answers: 20,
  accuracy: 50, // in percentage
  lastDifficultyLabel: "Medium",
  topics: {
    Java_Basics: 0.5,
    Java_Collections: 0.7,
    Java_Exceptions: 0.3,
    Java_Multithreading: 0.4,
    Java_OOP: 0.6,
  }
};

const ViewCoursesPage: React.FC = () => {
  const [appliedCourses, setAppliedCourses] = useState<any[]>([]);
  const { userId } = useAppSelector((state) => state.auth);
  const { data: FeedbackData } = useGetFeedbackReportsQuery({ userId });
  const [getModalfeedback] = useGetModalFeedbackReportsMutation();
  const [openModal, setOpenModal] = useState(false);
  const [feedbackResponse, setFeedbackResponse] = useState<any>(null);

  useEffect(() => {
    if (FeedbackData?.data) {
      setAppliedCourses(FeedbackData.data);
    }
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
      setFeedbackResponse(result);
      setOpenModal(true);
    } catch (error) {
      console.error("Failed to submit feedback report: ", error);
    }
  };
  // const userId = localStorage.getItem('userId');
  const {data} = useGetlearningReportQuery(userId);
  console.log(data);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        {/* Page Title */}
        <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Student Learning Track
          </Typography>
        </MotionBox>

         {/* 🔹 User Profile + Badges */}
         <MotionBox initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Card sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 3, mb: 3, borderRadius: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={student.avatar} alt={student.name} sx={{ width: 80, height: 80, mr: 2 }} />
              <CardContent>
                <Typography variant="h6">{student.name}</Typography>
                <Typography variant="body2" color="textSecondary">Email: {student.email}</Typography>
                <Typography variant="body2" color="textSecondary">Phone: {student.phone}</Typography>
              </CardContent>
            </Box>
            
            {/* 🔹 Badges Based on Level */}
            <Box>
              <Typography variant="body2" textAlign="center">Achievements</Typography>
              <Avatar src={badgeLevels[student.level]} sx={{ width: 60, height: 60 , ml:2 , mt:2}} />
            </Box>
          </Card>
        </MotionBox>

        {/* Learning Track Summary */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center", boxShadow: 2, borderRadius: 3 }}>
              <Typography variant="h6">{learningTrack.total_attempts}</Typography>
              <Typography variant="body2" color="textSecondary">Total Attempts</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center", boxShadow: 2, borderRadius: 3 }}>
              <Typography variant="h6">{learningTrack.correct_answers}</Typography>
              <Typography variant="body2" color="textSecondary">Correct Answers</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center", boxShadow: 2, borderRadius: 3 }}>
              <Typography variant="h6">{learningTrack.accuracy}%</Typography>
              <Typography variant="body2" color="textSecondary">Accuracy</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: 2, textAlign: "center", boxShadow: 2, borderRadius: 3 }}>
              <Typography variant="h6">{learningTrack.lastDifficultyLabel}</Typography>
              <Typography variant="body2" color="textSecondary">Last Difficulty</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Course Performance Table */}
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Topic Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Difficulty</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Attempted At</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Attempts</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Feedback</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appliedCourses.length > 0 ? (
                  appliedCourses.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell>{course.quiz?.topicName}</TableCell>
                      <TableCell>{course.quiz?.difficulty}</TableCell>
                      <TableCell>{new Date(course.quizAttempt?.attemptedAt).toLocaleDateString()}</TableCell>
                      <TableCell>{course.attempts}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          sx={{ borderRadius: 5 }}
                          onClick={() => HandleFeedback(course)}
                        >
                          Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No courses applied yet.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </MotionBox>

       {/* Radar Chart - Learning Performance */}
    <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" fontWeight="bold" textAlign="center" gutterBottom>
          Learning Performance (Radar Chart)
        </Typography>
        <Radar data={radarChartData} options={chartOptions} />
      </Paper>
    </MotionBox>

    {/* Bar Graph - Attempts per Topic */}
    <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" fontWeight="bold" textAlign="center" gutterBottom>
          Attempts per Topic (Bar Graph)
        </Typography>
        <Bar data={barChartData} options={chartOptions} />
      </Paper>
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
