import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Modal,
} from "@mui/material";
import { motion } from "framer-motion";
import { Navbar } from "../Hero-Section/Hero-section";
import { SiTestcafe } from "react-icons/si";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getRandomColor = () => {
  const colors = ["#3357FF"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function LearningPage() {
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState("");

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const result = await axios.get("http://localhost:5001/api/topic/");
      setTopics(result.data.data);
    } catch (error) {
      console.error("Error fetching topics", error);
    }
  };

  const simplifyContent = async () => {
    const selectedText = window.getSelection().toString().trim();
    
    if (!selectedText) {
      alert("Please select some text to simplify!");
      return;
    }

    setLoading(true);
    setModalOpen(true);
    setSimplifiedText("");

    try {
      const response = await axios.post("http://127.0.0.1:5001/api/text-classification/simplify", {
        text: selectedText,
      });
      setSimplifiedText(response.data.simplifiedText);
    } catch (error) {
      setSimplifiedText("Error fetching explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Grid container sx={{ height: "100vh", width: "100vw" }}>
        {/* Sidebar */}
        <Grid item xs={3} sx={{ color: "white" }}>
          <Drawer
            variant="permanent"
            sx={{
              width: 300,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 350,
                boxSizing: "border-box",
                p: 2,
                bgcolor: "#1E1E2F",
                color: "white",
              },
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Quiz Topics
            </Typography>
            <List>
              {topics.map((topic, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }}>
                  <ListItem 
                    button 
                    onClick={() => {
                      setSelectedContent(topic.content);
                      setSelectedTopic(topic.title);
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: getRandomColor(),
                        mr: 1.5,
                      }}
                    />
                    <SiTestcafe />
                    <ListItemText sx={{ ml: 1 }} primaryTypographyProps={{ fontSize: "12px" }}>
                      {topic.title}
                    </ListItemText>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Drawer>
        </Grid>

        {/* Main Content Section */}
        <Grid item xs={9} display="flex" justifyContent="center" alignItems="start" mt={10}>
          <Box sx={{ borderRadius: 2, overflow: "hidden", p: 3 }}>
            {selectedContent ? (
              <>
                <Box>
                  <div dangerouslySetInnerHTML={{ __html: selectedContent }} />
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      position: "fixed",
                      right: "5%",
                      top: "15%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={simplifyContent}
                  >
                    Simplify ✨
                  </Button>
                </Box>

                {/* 🎯 Quiz Section (Newly Added) */}
                <Box
                  sx={{
                    mt: 5,
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "#1E1E2F",
                    color: "white",
                    textAlign: "center",
                    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    "Knowledge is power, but learning to apply it is wisdom." 💡
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Ready to test what you just learned about <b>{selectedTopic}</b>?  
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, px: 5 }}
                    onClick={() => navigate(`/quiz/${selectedTopic}`)}
                  >
                    Start Quiz 🎯
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="h6" color="gray" textAlign="center">
                Select a topic to view details
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Modal for Simplified Explanation */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: "10%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "600px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Simplified Explanation
            </Typography>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : (
              <Typography variant="body1">{simplifiedText}</Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(false)}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </motion.div>
        </Modal>
      </Grid>
    </>
  );
}
