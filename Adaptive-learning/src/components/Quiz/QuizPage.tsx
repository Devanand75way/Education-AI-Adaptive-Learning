import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function QuizPage() {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/quiz/${topic}`);
      setQuestions(res.data.questions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz questions", error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#1E1E2F" color="white" p={3}>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : showResult ? (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h4">Quiz Completed 🎉</Typography>
          <Typography variant="h6" mt={2}>Your Score: </Typography>
        </motion.div>
      ) : (
        <motion.div key={currentQuestion} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" mb={3}></Typography>
          <RadioGroup value={selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)}>
            {/* {questions[currentQuestion].options.map((option, index) => (
              <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))} */}
          </RadioGroup>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNext} disabled={!selectedAnswer}>
            {/* {currentQuestion + 1 < questions.length ? "Next" : "Finish Quiz"} */}
          </Button>
        </motion.div>
      )}
    </Box>
  );
}
