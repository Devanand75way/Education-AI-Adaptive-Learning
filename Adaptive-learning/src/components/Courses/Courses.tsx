import React, { useMemo } from "react";
import { Container, Typography, Card, CardContent, CardMedia, LinearProgress, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Navbar } from "../Hero-Section/Hero-section";
import CourseSection from "./Courses-section"

// Sample Data
const lessons = [
  { title: "React Basics", image: "/Courses/react.webp", progress: 80 },
  { title: "JavaScript Advanced", image: "/Courses/js.png", progress: 60 },
  { title: "Node.js Fundamentals", image: "/Courses/node.png", progress: 90 },
];

const favCourses = [
  { title: "Full Stack Development", logo: "/Courses/fs.png", description: "Learn frontend & backend" },
  { title: "Data Science", logo: "/Courses/ds.jpg", description: "Master Python & ML" },
  { title: "Cyber Security", logo: "/Courses/cs.jpg", description: "Protect systems & networks" },
  { title: "AI & Machine Learning", logo: "/Courses/AI.png", description: "Build smart applications" },
  { title: "Cloud Computing", logo: "/Courses/cloud.webp", description: "Master AWS, Azure, GCP" },
  { title: "DevOps Essentials", logo: "/Courses/do.png", description: "CI/CD, Docker, Kubernetes" },
  { title: "UI/UX Design", logo: "/Courses/ui.png", description: "Create engaging designs" },
  { title: "Blockchain Development", logo: "/Courses/bl.png", description: "Build decentralized apps" },
];

const Courses: React.FC = () => {
  // Memoized Styles for Cards
  const cardStyles = useMemo(
    () => ({
      borderRadius: "12px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
      padding: "16px",
      height: "100%",
    }),
    []
  );

  return (
    <>
      <Navbar />
      <Box sx={{ width: "100vw", overflowX: "hidden", py: 15 }}>
        {/* Welcome Message */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h4" sx={{ mb: 3, ml:30 , color: "#FF6B00" , fontWeight : "bold" }}>
            Welcome to Your Learning Journey
          </Typography>
        </motion.div>

        {/* Lessons Section */}
        <Container
        >
          <Grid container spacing={5} sx={{ mb: 5 }}>
            {lessons.map((lesson, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card sx={cardStyles}>
                    <CardMedia component="img" height="160" image={lesson.image} alt={lesson.title} />
                    <CardContent>
                      <Typography variant="h6">{lesson.title}</Typography>
                      <Box sx={{ width: "100%", mt: 2 }}>
                        <LinearProgress variant="determinate" value={lesson.progress} />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {lesson.progress}% Completed
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

         <Box>
          <Container sx={{ py: 5}}>
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
               <Typography variant="h6" sx={{ mb: 3 , color: "#FF6B00"}}>
               Choose Favorite courses from top category
               </Typography>
               </motion.div>
               <Grid container spacing={4}>
               {favCourses.map((course, index) => (
               <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                    <Card sx={{ ...cardStyles, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                         <CardMedia component="img" image={course.logo} alt={course.title} sx={{ width: 80, height: 80, mt: 2 }} />
                         <CardContent>
                         <Typography variant="h6" fontWeight="bold" fontSize="15px"> {course.title}</Typography>
                         <Typography variant="body2" sx={{ mt: 1 }}>{course.description}</Typography>
                         </CardContent>
                    </Card>
                    </motion.div>
               </Grid>
               ))}
               </Grid>
          </Container>
         </Box>
      </Box>

      <CourseSection/>
    </>
  );
};

export default Courses;
