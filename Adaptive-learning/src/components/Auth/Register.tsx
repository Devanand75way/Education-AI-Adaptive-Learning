import React, { useState } from "react";
import { Button, Typography, Box, TextField, IconButton, InputAdornment, MenuItem, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Hero-Section/Hero-section";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegisterMutation } from "../../services/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const MotionBox = motion(Box);
type FormData = typeof schema.__outputType;

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(4, "At least 4 characters required").required("Password is required"),
  role: yup.string().required("Please select a role"),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [FeedUser] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data)
    setLoading(true);
    try {
      await FeedUser(data).unwrap();
      toast.success("User Registered");
      navigate("/auth");
    } catch (error) {
      toast.error("Registration failed");
      console.error(error);
    }
    setLoading(false);
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
              <TextField
                fullWidth
                select
                label="Select Role"
                variant="outlined"
                margin="normal"
                {...register("role")}
                error={!!errors.role}
                helperText={errors.role?.message}
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
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button fullWidth variant="contained" sx={{ bgcolor: "#FF6B00", borderRadius: 5, marginTop: 2 }} type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
              </Button>
              <Typography variant="body2" textAlign="center" sx={{ marginTop: 2 }}>
                Already have an account? <Button onClick={() => navigate("/auth")} sx={{ color: "#FF6B00" }}>Login</Button>
              </Typography>
            </form>
          </Box>
        </Box>
      </MotionBox>
    </>
  );
};

export default RegisterPage;
