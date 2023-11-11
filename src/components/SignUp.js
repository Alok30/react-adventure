import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { BASE_URL } from "../constant";
import { useNavigate } from "react-router-dom";
import axiosWrapper from "../util/axiosWrapper";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [colorPreference, setColorPreference] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleColorChange = (e) => {
    setColorPreference(e.target.value);
  };
  const registerNewUser = async (e) => {
    e.preventDefault();
    if (!userName || !password || !colorPreference) {
      setError("All fields are required.");
      return;
    }
    try {
      const data = {
        username: userName,
        password: password,
        colorPreference: colorPreference,
      };
      const response = await axiosWrapper.post(`${BASE_URL}/signup`, data);
      if (response.status === 201) {
        console.log("Registration successful!");
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="user-name"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} width={"100%"}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="simple-select-label">Select Color</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={colorPreference}
                  label="Select Color"
                  onChange={handleColorChange}
                >
                  <MenuItem value={"blue"}>Blue</MenuItem>
                  <MenuItem value={"green"}>Green</MenuItem>
                  <MenuItem value={"red"}>Red</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => registerNewUser(e)}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
