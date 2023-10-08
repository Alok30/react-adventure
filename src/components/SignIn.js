import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { userAppStore } from "../store";
import { BASE_URL } from "../constant";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setShowAlert(false);
  };

  const loginFunc = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/signin`, formData, {
        withCredentials: true,
      });

      if (response.status === 200 && response.statusText === "OK") {
        const { username } = formData;
        userAppStore.setState({
          colorPreference: response?.data?.user?.colorPreference,
          isUserLogined: true,
          userName: username,
        });
        navigate("/");
      }
    } catch (error) {
      setFormData({
        username: "",
        password: "",
      });
      setShowAlert(true);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={formData.password}
              label="Password"
              type="password"
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={loginFunc}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  type="text"
                  fullWidth
                  variant="text"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate("/signup")}
                >
                  Register a new user? Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
          {showAlert && (
            <Alert severity="error">Failed to login. Please try again!</Alert>
          )}
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default SignInPage;
