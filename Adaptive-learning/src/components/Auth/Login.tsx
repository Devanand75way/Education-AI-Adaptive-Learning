import React, { useState } from "react";
import { Button, Typography, Box, TextField, IconButton, InputAdornment, FormControlLabel, Checkbox, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Hero-Section/Hero-section";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MotionBox = motion(Box);

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      rememberMe: Yup.boolean(),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success("Logged in Successfully!", { position: "top-center" });
        navigate("/"); // Redirect after login
      }, 2000);
    },
  });

  return (
    <>
      <Navbar />
      <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
          <Box sx={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/login.jpg" alt="Register" style={{ width: "80%", borderRadius: 10 }} />
          </Box>
          <Box sx={{ flex: 1, padding: 4, display: "flex", flexDirection: "column", justifyContent: "center", border: "1px solid #ddd", borderRadius: "10px" }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center">Login</Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField 
                fullWidth 
                label="Email" 
                variant="outlined" 
                margin="normal" 
                {...formik.getFieldProps("email")} 
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField 
                fullWidth 
                label="Password" 
                type={showPassword ? "text" : "password"} 
                variant="outlined" 
                margin="normal" 
                {...formik.getFieldProps("password")} 
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel 
                control={<Checkbox {...formik.getFieldProps("rememberMe")} />} 
                label="Remember Me" 
              />

              <Button 
                fullWidth 
                variant="contained" 
                sx={{ bgcolor: "#FF6B00", borderRadius: 5, marginTop: 2 }}
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
              </Button>

              <Typography variant="body2" textAlign="center" sx={{ marginTop: 2 }}>
                Don't have an account? <Button onClick={() => navigate("/register")} sx={{ color: "#FF6B00" }}>Register</Button>
              </Typography>
            </form>
          </Box>
        </Box>
      </MotionBox>
    </>
  );
};

export default LoginPage;
