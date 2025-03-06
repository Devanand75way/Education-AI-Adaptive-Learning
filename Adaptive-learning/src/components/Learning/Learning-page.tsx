import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { Navbar } from "../Hero-Section/Hero-section";
import { IoBookSharp } from "react-icons/io5";
import { SiTestcafe } from "react-icons/si";
import { useNavigate } from "react-router-dom";

interface Lesson {
  title: string;
  videoId: string;
}

interface Quiz {
  title: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const lessons: Lesson[] = [
  // Part 1 Lessons
  { title: "Algebra Basics", videoId: "UVF8Kw5J1Jw", part: "Part 1" },
  { title: "Quadratic Equations", videoId: "s_S4J2vArUE", part: "Part 1" },
  { title: "Trigonometry Basics", videoId: "6BFBHmQ_Kec", part: "Part 1" },
  { title: "Probability & Statistics", videoId: "XlD-OGG7bgM", part: "Part 1" },
  { title: "Geometry - Circles", videoId: "91D__gQVr5M", part: "Part 1" },

  // Part 2 Lessons
  { title: "Calculus - Derivatives", videoId: "PAONXliaxag", part: "Part 2" },
  { title: "Calculus - Integrals", videoId: "9tMBIT-O77o", part: "Part 2" },
  { title: "Vectors and Matrices", videoId: "UVF8Kw5J1Jw", part: "Part 2" },
  {
    title: "Linear Algebra - Eigenvalues",
    videoId: "PFDu9oVAE-g",
    part: "Part 2",
  },
  { title: "Number Theory Basics", videoId: "q-ygrZVuikY", part: "Part 2" },
];

const quizzes: Quiz[] = [
  { title: "Algebra Quiz", topic: "algebra", difficulty: "Easy" },
  { title: "Quadratic Quiz", topic: "quadratic", difficulty: "Medium" },
  { title: "Calculus Quiz", topic: "calculus", difficulty: "Hard" },
  { title: "Trigonometry Quiz", topic: "trigonometry", difficulty: "Easy" },
  { title: "Statistics Quiz", topic: "statistics", difficulty: "Medium" },
  { title: "Geometry Quiz", topic: "geometry", difficulty: "Hard" },
  { title: "Vectors Quiz", topic: "vectors", difficulty: "Easy" },
  { title: "Number Theory Quiz", topic: "number-theory", difficulty: "Medium" },
];

const getRandomColor = () => {
  const colors = ["#3357FF", "#FF33A1", "#F3A712"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function LearningPage() {

     const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(lessons[0].videoId);

  const handleQuizClick = (topic: string, difficulty: string): void => {
     navigate(`/quiz/${topic}/${difficulty}`);
  };

  return (
    <>
      <Navbar />
      <Grid
        container
        sx={{ height: "100vh", width: "100vw", bgcolor: "#f5f5f5" }}
      >
        {/* Sidebar */}
        <Grid item xs={3} sx={{  color: "white" }}>
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
            {/* Lessons - Part 1 */}
            <Typography variant="h6" fontWeight="bold" mb={2} >
              📖 Lessons - Part 1
            </Typography>
            <List>
              {lessons
                .filter((lesson) => lesson.part === "Part 1")
                .map((lesson, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }}>
                    <ListItem
                      component="li"
                      button
                      onClick={() => setSelectedVideo(lesson.videoId)}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderRadius: 1,
                        transition: "0.3s",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
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
                      <IoBookSharp />
                      <ListItemText 
                      primaryTypographyProps={{ fontSize: "12px" }}
                      sx={{ ml: 1 }}>{lesson.title}</ListItemText>
                    </ListItem>
                  </motion.div>
                ))}
            </List>

            {/* Lessons - Part 2 */}
            <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>
              📖 Lessons - Part 2
            </Typography>
            <List>
              {lessons
                .filter((lesson) => lesson.part === "Part 2")
                .map((lesson, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }}>
                    <ListItem
                      button
                      onClick={() => setSelectedVideo(lesson.videoId)}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderRadius: 1,
                        transition: "0.3s",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
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
                      <IoBookSharp />
                      <ListItemText 
                      primaryTypographyProps={{ fontSize: "12px" }}
                      sx={{ ml: 1 }}>{lesson.title}</ListItemText>
                    </ListItem>
                  </motion.div>
                ))}
            </List>

            {/* Quiz Section */}
            <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>
              Quiz
            </Typography>
            <List>
              {quizzes.map((quiz, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }}>
                  <ListItem
                    button
                    onClick={() => handleQuizClick(quiz.topic, quiz.difficulty)}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.1)",
                      borderRadius: 1,
                      transition: "0.3s",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
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
                    <ListItemText
                      sx={{ ml: 1 }}
                      primaryTypographyProps={{ fontSize: "12px" }}
                    >
                      {quiz.title} - {quiz.difficulty}
                    </ListItemText>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Drawer>
        </Grid>

        {/* Main Video Section */}
        <Grid
          item
          xs={9}
          display="flex"
          justifyContent="center"
          alignItems="start"
          mt={10}
        >
          <Box
            sx={{
              width: "90%",
              height: "80%",
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
