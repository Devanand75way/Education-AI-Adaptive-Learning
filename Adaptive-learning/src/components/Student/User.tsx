import React from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Avatar, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Navbar } from "../Hero-Section/Hero-section";

const student = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+1 234 567 890",
  avatar: "/profile.jpg",
};

const appliedCourses = [
  { id: 1, courseName: "React Development", instructor: "Alex Smith", duration: "3 Months", status: "Approved" },
  { id: 2, courseName: "Full Stack Web", instructor: "Emily Johnson", duration: "6 Months", status: "Pending" },
  { id: 3, courseName: "Data Science", instructor: "Michael Lee", duration: "5 Months", status: "Completed" },
];

const MotionBox = motion(Box);

const ViewCoursesPage: React.FC = () => {
  return (
    <>
     <Navbar/>
     <Container maxWidth="lg" sx={{ mt: 15 }}>
      {/* Title */}
      <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Student Applied Courses
        </Typography>
      </MotionBox>

      {/* Student Info */}
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

      {/* Courses Table */}
      <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Course Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Instructor</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appliedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>
                    <Typography sx={{ color: course.status === "Approved" ? "green" : course.status === "Pending" ? "orange" : "blue" }}>
                      {course.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MotionBox>
    </Container>
    </>
  );
};

export default ViewCoursesPage;
