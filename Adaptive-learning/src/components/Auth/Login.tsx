import React, { useState } from "react";
import { Button, Typography, Box, TextField, IconButton, InputAdornment, FormControlLabel, Checkbox, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Hero-Section/Hero-section";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "../../services/api";
import { useAppSelector } from "../../store/store";

const MotionBox = motion(Box);
type FormData = typeof schema.__outputType;


const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  rememberMe: yup.boolean(),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const [AuthUser] = useLoginMutation()
   const { isAuthenticated } = useAppSelector((state) => state.auth);
   console.log(isAuthenticated);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await AuthUser(data).unwrap();
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed");
      console.error(error);
    }
    setLoading(false);
  };

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
                        {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel 
                control={<Checkbox {...register("rememberMe")} />} 
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
