import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import TimerIcon from "@mui/icons-material/Timer";
import { useGetQuizQuestionsQuery } from "../../services/api";
import { useParams } from "react-router-dom";
import { Navbar } from "../Hero-Section/Hero-section";

// External CSS using useMemo
const useStyles = () =>
  useMemo(
    () => ({
      container: {
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        marginTop: "4rem",
      },
      questionBox: {
        padding: "1.5rem",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      },
      optionButton: {
        width: "100%",
        textAlign: "left",
        justifyContent: "flex-start",
        padding: "10px 15px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        transition: "0.3s",
        marginBottom: "5px",
      },
      selectedOption: {
        border: "2px solid green",
        backgroundColor: "#e6f7e6",
      },
      submitButton: {
        backgroundColor: "#0D6EFD",
        color: "#fff",
        marginTop: "1rem",
        "&:hover": {
          backgroundColor: "#025ce2",
        },
      },
      timerBox: {
        padding: "1rem",
        textAlign: "center",
        borderRadius: "8px",
        backgroundColor: "#f4f4f4",
      },
      quizList: {
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      },
      quizItem: {
        padding: "10px",
        borderRadius: "6px",
        margin: "5px 0",
        backgroundColor: "#e0f2f1",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#b2dfdb",
        },
      },
    }),
    []
  );

const QuizPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const userId = localStorage.getItem("userId") || "";
  const topicName = topic ?? "Java Basics";

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);

  const { data: getQuestions } = useGetQuizQuestionsQuery({
    topic: topicName,
    userId,
  });
console.log(questions)

  useEffect(() => {
    if (getQuestions?.data) {
      setQuestions(getQuestions.data);
    }
  }, [getQuestions]);

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      setAttemptedQuestions((prev) => prev + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };
  
  const styles = useStyles();
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = (attemptedQuestions / questions.length) * 100;

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={styles.container}>
        <Button
          variant="outlined"
          sx={{ marginBottom: 2 }}
          onClick={() => window.history.back()}
        >
          Back
        </Button>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={styles.questionBox}>
              {questions.length > 0 && (
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: "18px", textAlign: "center" }}
                  >
                    {questions[currentQuestionIndex].question}
                  </Typography>

                  <List>
                    {JSON.parse(questions[currentQuestionIndex].options).map(
                      (option, idx) => (
                        <ListItem key={idx} disablePadding>
                          <Button
                            variant={
                              selectedAnswer === option
                                ? "contained"
                                : "outlined"
                            }
                            sx={styles.optionButton}
                            onClick={() => setSelectedAnswer(option)}
                          >
                            {option}
                          </Button>
                        </ListItem>
                      )
                    )}
                  </List>

                  <Button
                    variant="contained"
                    sx={{
                      marginTop: 2,
                      fontSize: "14px",
                      textTransform: "none",
                    }}
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                  >
                    Next
                  </Button>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  fullWidth
                  sx={styles.submitButton}
                  variant="contained"
                  disabled={attemptedQuestions < questions.length}
                >
                  Submit Answer
                </Button>
              </motion.div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={styles.timerBox}>
              <TimerIcon sx={{ fontSize: 40, color: "green" }} />
              <Typography variant="h6">{timer} sec</Typography>
              <Typography variant="body2">Timer Remaining</Typography>
              <Box sx={{ marginTop: "10px" }}>
                <CircularProgress
                  variant="determinate"
                  value={progressPercentage}
                />
                <Typography variant="body2">
                  {progressPercentage.toFixed(0)}% Completed
                </Typography>
              </Box>
            </Box>

            {/* Quiz Questions List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper elevation={2} sx={styles.quizList}>
                <Typography variant="h6">Quiz Questions List</Typography>
                <List>
                  {questions.map((q, index) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      sx={styles.quizItem}
                    >
                      <ListItemText primary={`Quiz Question ${index + 1}`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default QuizPage;
