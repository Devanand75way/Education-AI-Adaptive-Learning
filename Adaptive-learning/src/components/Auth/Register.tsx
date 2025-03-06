import React, { useState } from "react";
import { Button, Typography, Box, TextField, IconButton, InputAdornment, MenuItem, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Hero-Section/Hero-section";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MotionBox = motion(Box);

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      role: Yup.string().required("Please select a role"),
    }),
    onSubmit: (values) => {
      setLoading(true); // Start loading
      setTimeout(() => {
        setLoading(false); // Stop loading
        toast.success("Registered Successfully!");
        console.log("Form Submitted", values);
      }, 2000); 
    },
  });

  return (
    <>
      <Navbar />
      <ToastContainer />
      <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
          <Box sx={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/register.jpg" alt="Register" style={{ width: "80%", borderRadius: 10 }} />
          </Box>
          <Box sx={{ flex: 1, padding: 4, display: "flex", flexDirection: "column", justifyContent: "center", border: "1px solid #ddd", borderRadius: "10px" }}>
            <Typography variant="h4" fontWeight="bold" color="#FF6B00" textAlign="center">
              Register
            </Typography>
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
                label="Username"
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps("username")}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                fullWidth
                select
                label="Select Role"
                variant="outlined"
                margin="normal"
                {...formik.getFieldProps("role")}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
              </TextField>
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
              <Button fullWidth variant="contained" sx={{ bgcolor: "#FF6B00", borderRadius: 5, marginTop: 2 }} type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
              </Button>
              <Typography variant="body2" textAlign="center" sx={{ marginTop: 2 }}>
                Already have an account?{" "}
                <Button onClick={() => navigate("/login")} sx={{ color: "#FF6B00" }}>
                  Login
                </Button>
              </Typography>
            </form>
          </Box>
        </Box>
      </MotionBox>
    </>
  );
};

export default RegisterPage;
