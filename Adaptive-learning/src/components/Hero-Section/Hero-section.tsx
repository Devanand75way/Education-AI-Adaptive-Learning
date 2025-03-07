import React from "react";
import { AppBar, Toolbar, Button, Typography, Container, Box, Card, CardContent, TextField, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import { RiBillFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { TiGroup } from "react-icons/ti";
import { AiOutlineCheckCircle , AiOutlineMail} from "react-icons/ai";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { FaBrain } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

const MotionBox = motion(Box);

export const Navbar: React.FC = () => {
     const navigate = useNavigate();
     const isAuthenticated = useAppSelector((state) => state.auth)
     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   
     const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
       setAnchorEl(event.currentTarget);
     };
   
     const handleMenuClose = () => {
       setAnchorEl(null);
     };
   
     const handleLogout = () => {
       // Implement logout functionality
       console.log("User Logged Out");
       handleMenuClose();
     };
     return (
      <AppBar position="absolute" color="transparent" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>Skilline</Typography>
        <Box>
          <Button onClick={() => navigate("/")} color="inherit">Home</Button>
          <Button onClick={() => navigate("/courses")} color="inherit">Courses</Button>
          <Button color="inherit">Careers</Button>
          <Button color="inherit">About Us</Button>

          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
                <Avatar alt="User Profile" src="/profile.jpg" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => navigate("/view-profile")}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/login")} sx={{ color: "#000", marginRight: 1 }}>Login</Button>
              <Button onClick={() => navigate("/register")} variant="contained" sx={{ bgcolor: "#FF6B00", borderRadius: 5 }}>Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
     );
};
   
const HeroSection: React.FC = () => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#FEF6EC" }}
    >
      <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            <Typography variant="h2" component="span" sx={{ color: "#FF6B00" , fontWeight:"bold" }}>AI Learning</Typography> Unlock Your Full Potential with Smart Technology
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, color: "#666" }}>
            Skilline is an interactive platform that teaches in a more engaging way.
          </Typography>
          <Box sx={{ display: "flex", marginTop: 3 }}>
            <Button variant="contained" sx={{ bgcolor: "#FF6B00", borderRadius: 5, marginRight: 2 }}>Join for Free</Button>
            <Button variant="outlined">Watch how it works</Button>
          </Box>
        </Box>
        <Box component="img" src="/h2.png" alt="Student" sx={{ width: "70%", borderRadius: "10px" }} />
      </Container>
    </MotionBox>
  );
};

const MessageSection: React.FC = () => {
     return (
       <MotionBox
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         sx={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: "#FEF6EC" }}
       >
         <Typography variant="h3" sx={{ color: "#FF6B00" , fontWeight: "bold", textAlign: "center" }}>AI Learning Adaptive</Typography>
         <Typography variant="h6" sx={{ color: "#666", marginTop: 1, textAlign: "center" }}>Personalized AI-driven learning experiences for you.</Typography>
         <Box sx={{ display: "flex", gap: 4, marginTop: 4 }}>
           {[RiBillFill, SlCalender, TiGroup].map((Icon, index) => (
             <Card key={index} sx={{ width: 300, height:250, padding: 3, textAlign: "center", borderRadius: 3 }}>
               <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                 <Icon size={40} color="#FF6B00" />
               </Box>
               <CardContent>
                 <Typography variant="h6" fontWeight="bold">AI Feature {index + 1}</Typography>
                 <Typography variant="body2" color="text.secondary">
                   Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, nemo omnis. Iusto ullam velit voluptatibus harum modi consectetur, amet vitae.
                 </Typography>
               </CardContent>
             </Card>
           ))}
         </Box>
       </MotionBox>
     );
   };


   const ThirdSection: React.FC = () => {
     return (
       <MotionBox
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: "#FFF" }}
       >
         <Typography variant="h2" sx={{ color: "#FF6B00" , fontWeight: "bold", textAlign: "center" }}>Empowering Future with AI</Typography>
         <Typography variant="h6" sx={{ color: "#666", marginTop: 1, textAlign: "center" }}>Explore the latest advancements in AI-driven education.</Typography>
         <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%", marginTop: 4 , borderRadius: 10 }}>
           {["/group.avif", "/teach.avif"].map((src, index) => (
             <Box key={index} sx={{ position: "relative", width: "45%" }}>
               <img src={src} alt={`AI Learning ${index + 1}`} style={{ width: "100%", borderRadius: 10 }} />
               <Box sx={{position: "absolute",top: 0,left: 0,width: "100%",height: "100%",bgcolor: "rgba(0, 0, 0, 0.3)",display: "flex",alignItems: "center",justifyContent: "center",borderRadius: 10,}}
               >
               <Button variant="contained" sx={{ borderRadius: 5, marginRight: 2 }}>Join for Free</Button>
               </Box>
             </Box>
           ))}
         </Box>
       </MotionBox>
     );
};

const FeaturesSection: React.FC = () => {
     return (
       <MotionBox
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: "#F4F4F4" }}
       >
         <Typography variant="h4" sx={{color: "#FF6B00" , fontWeight: "bold", textAlign: "center" , marginTop:5}}>Our Features</Typography>
         <Typography variant="h6" sx={{ color: "#666", marginTop: 1, textAlign: "center" }}>Discover the benefits of our platform</Typography>
         <Box sx={{ display: "flex", width: "80%", marginTop: 4, alignItems: "center" }}>
           <Box sx={{ flex: 4 }}>
             <img src="/meet.avif" alt="Feature" style={{ width: "100%", borderRadius: 10 }} />
           </Box>
           <Box sx={{ flex: 3, paddingLeft: 4 ,paddingBottom: 30, textAlign: "center" }}>
             <Typography variant="h4" fontWeight="bold" color="#FF6B00" >Why Choose Us?</Typography>
             <Box sx={{ display: "flex", alignItems: "center", marginTop: 5 }}>
               <AiOutlineCheckCircle size={20} color="#FF6B00" />
               <Typography variant="h6" sx={{ marginLeft: 1 }}>Personalized Learning Paths</Typography>
             </Box>
             <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
               < FaBrain  size={20} color="#FF6B00" />
               <Typography variant="h6" sx={{ marginLeft: 1 }}>AI-Powered Insights</Typography>
             </Box>
             <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
               <MdOutlineIntegrationInstructions size={20} color="#FF6B00" />
               <Typography variant="h6" sx={{ marginLeft: 1 }}>Seamless Integration</Typography>
             </Box>
           </Box>
         </Box>
       </MotionBox>
     );
   };
   

export const Footer: React.FC = () => {
     return (
       <Box sx={{ width: "100vw", height: "50vh", bgcolor: "#222", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
         <Typography variant="h5" fontWeight="bold" textAlign="center">Stay Updated with AI Learning</Typography>
         <Typography variant="body1" textAlign="center" sx={{ marginTop: 1, color: "#bbb" }}>Subscribe to our newsletter to get the latest AI advancements.</Typography>
         <Box sx={{ display: "flex", marginTop: 3, gap: 1 }}>
           <TextField variant="outlined" placeholder="Enter your email" sx={{ bgcolor: "#fff", borderRadius: 2 }} />
           <IconButton sx={{ bgcolor: "#FF6B00", color: "#fff", borderRadius: 2 }}>
             <AiOutlineMail size={24} />
           </IconButton>
         </Box>
         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 3 }}>
           <Typography variant="body1">✔ Adaptive Learning Paths</Typography>
           <Typography variant="body1">✔ AI-Driven Insights</Typography>
           <Typography variant="body1">✔ Seamless User Experience</Typography>
         </Box>
       </Box>
     );
   };


const HomePage: React.FC = () => {
  return (
    <Box sx={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <MessageSection/>
      <ThirdSection/>
      <FeaturesSection/>
      <Footer/>
    </Box>
  );
};

export default HomePage;
