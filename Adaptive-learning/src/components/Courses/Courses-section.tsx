import { Typography, Card, CardContent, CardMedia, Grid, Avatar, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Footer } from "../Hero-Section/Hero-section";
import { useNavigate } from "react-router-dom";

const courses = [
  { title: "AWS Certified Solutions Architect", image: "/Courses/child.webp", instructor: "Lina", oldPrice: "$100", newPrice: "$80" },
  { title: "AWS Certified Solutions Architect", image: "/Courses/cloud1.webp", instructor: "Lina", oldPrice: "$100", newPrice: "$80" },
  { title: "AWS Certified Solutions Architect", image: "/Courses/block.webp", instructor: "Lina", oldPrice: "$100", newPrice: "$80" },
  { title: "AWS Certified Solutions Architect", image: "/Courses/child.webp", instructor: "Lina", oldPrice: "$100", newPrice: "$80" }
];

const Choices_courses = [
  { title: "AWS Certified Solutions Architect", image: "/Courses/block.webp", instructor: "Lina", oldPrice: "$100", newPrice: "$80" },
  { title: "AWS Certified Solutions Architect", image: "/Courses/child.webp", instructor: "Lina", oldPrice: "$100", newPrice: "$80" },
  { title: "AWS Certified Solutions Architect", image: "/Courses/cloud1.webp", instructor: "Lina", oldPrice: "$100", newPrice: "$80" },
  { title: "AWS Certified Solutions Architect", image: "/Courses/child.webp", instructor: "Lina", oldPrice: "$100", newPrice: "$80" }
];

export interface Course {
  title: string;
  image: string;
  instructor: string;
  oldPrice: string;
  newPrice: string;
}

const CourseCard = ({ course }: { course: Course }) => {
     const navigate = useNavigate();
     return (
          <motion.div whileHover={{ scale: 1.05 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 , width:"320px"}}>
            <CardMedia component="img" image={course.image} alt={course.title} sx={{ height: 180, borderRadius: 2 }} />
            <CardContent>
              <Typography variant="body2" color="textSecondary">Design  •  3 Month</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>{course.title}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
                <Box display="flex" alignItems="center">
                  <Avatar src="/images/avatar.jpg" sx={{ width: 30, height: 30, mr: 1 }} />
                  <Typography variant="body2">{course.instructor}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>{course.oldPrice}</Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: "bold" }}>{course.newPrice}</Typography>
                </Box>
              </Box>
              <Box textAlign="center">
                <Button onClick={() => navigate("/learning-class")} variant="contained" sx={{ bgcolor: "#FF6B00", borderRadius: 5, marginRight: 2, marginTop: 2 }}>Join for Free</Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
     )
}

const ChoiceCourseCard = ({ course }: { course: Course }) => {
     const navigate = useNavigate();
     return (
     <motion.div whileHover={{ scale: 1.05 }}>
       <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, width:"320px"}}>
         <CardMedia component="img" image={course.image} alt={course.title} sx={{ height: 180, borderRadius: 2 }} />
         <CardContent>
           <Typography variant="body2" color="textSecondary">Design  •  3 Month</Typography>
           <Typography variant="h6" sx={{ mt: 1 }}>{course.title}</Typography>
           <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
           </Typography>
           <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
             <Box display="flex" alignItems="center">
               <Avatar src="/images/avatar.jpg" sx={{ width: 30, height: 30, mr: 1 }} />
               <Typography variant="body2">{course.instructor}</Typography>
             </Box>
             <Box>
               <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>{course.oldPrice}</Typography>
               <Typography variant="body2" color="primary" sx={{ fontWeight: "bold" }}>{course.newPrice}</Typography>
             </Box>
           </Box>
           <Box textAlign="center">
             <Button onClick={()=> navigate("/learning-class")} variant="contained" sx={{ bgcolor: "#FF6B00", borderRadius: 5, marginRight: 2, marginTop: 2 }}>Join for Free</Button>
           </Box>
         </CardContent>
       </Card>
     </motion.div>
   );
}

const CoursesSection = () => {
  return (
    <>
     <Box sx={{ py: 2, backgroundColor: "#EAF6FF", borderRadius: 3 , width:"100%"}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={10} mb={3}>
        <Typography variant="h5" ml="50px" fontWeight="bold">Recommended for you</Typography>
      </Box>

      <Grid container spacing={1} justifyContent="center" mx="5px" py="10px">
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={20} mb={2}>
        <Typography variant="h5" ml="50px" fontWeight="bold">The Course in Personal Development</Typography>
      </Box>

      <Grid container spacing={1} justifyContent="center" mx="5px" py="10px" mb={25}>
        {Choices_courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ChoiceCourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
    <Footer/>
    </>
  );
};

export default CoursesSection;
