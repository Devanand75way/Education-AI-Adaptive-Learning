import React, { useState } from "react";
import { TextField, Button, CircularProgress, Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { Navbar } from "../Hero-Section/Hero-section";

const Simplify = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      alert("Please enter a question!");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/text/simplify", { text: question, });
      setAnswer(response.data.simplifiedText);
    } catch (error) {
      setAnswer("Error fetching response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
          <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
      p={3}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "400px", textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Ask a Question
          </Typography>
          <TextField
            fullWidth
            label="Type your question..."
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAskQuestion}
            sx={{ mb: 2 }}
          >
            Get Answer
          </Button>

          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            answer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper elevation={2} sx={{ p: 2, mt: 2, backgroundColor: "#e3f2fd" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Answer:
                  </Typography>
                  <Typography variant="body1">{answer}</Typography>
                </Paper>
              </motion.div>
            )
          )}
        </Paper>
      </motion.div>
    </Box>
    </>
  );
};

export default Simplify;
