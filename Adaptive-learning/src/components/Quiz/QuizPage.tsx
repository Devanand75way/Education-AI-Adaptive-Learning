import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Navbar } from "../Hero-Section/Hero-section";

// Questions Array
const questions = [
  {
    question: "The Indian Contract Act 1872 came into force on...",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Solve: 5 + 3 x 2",
    options: ["11", "16", "10", "15"],
    answer: "11",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
      setProgress(((currentQuestion + 1) / questions.length) * 100);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            width: "80%",
            maxWidth: 600,
            p: 4,
            bgcolor: "white",
            boxShadow: 3,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            MCT Mock Tests
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ my: 2 }} />

          {isCompleted ? (
            // ✅ Feedback Page After Completion
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" fontWeight="bold" color="primary">
                Quiz Completed! 🎉
              </Typography>
              <Typography variant="h6" color="secondary" mt={2}>
                Your Score: {score} / {questions.length}
              </Typography>
              <Typography variant="body1" mt={2}>
                {score === questions.length
                  ? "Excellent! You got everything right. 🎯"
                  : score > questions.length / 2
                  ? "Good Job! Keep Practicing. 💪"
                  : "Don't worry! Try again and improve. 😊"}
              </Typography>
              <motion.img
                src="https://cdn.dribbble.com/users/1233499/screenshots/4632952/media/9e281fcd0176894a8a7fbb56ebecbfa3.gif"
                alt="Success Animation"
                style={{ width: "100%", marginTop: "20px", borderRadius: "10px" }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => window.location.reload()}
              >
                Restart Quiz 🔄
              </Button>
            </motion.div>
          ) : (
            // ✅ Quiz Questions Component
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Question {currentQuestion + 1}
              </Typography>
              <Typography>{questions[currentQuestion].question}</Typography>
              <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                {questions[currentQuestion].options.map((option, index) => (
                  <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            </motion.div>
          )}

          {/* ✅ Buttons Section */}
          {!isCompleted && (
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button
                variant="contained"
                color="secondary"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!selectedOption}
                color={currentQuestion === questions.length - 1 ? "primary" : "success"}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
