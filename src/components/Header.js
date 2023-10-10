import React from "react";
import { useNavigate } from "react-router-dom";
import axiosWrapper from "../util/axiosWrapper";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ColorPicker from "./ColorPickerHeader";
import { userAppStore } from "../store";

const Header = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("login");
  };

  const logoutCurrentUser = async () => {
    try {
      const resp = await axiosWrapper.get(`/logout`);
      if (resp?.data?.message) {
        localStorage.removeItem('userSession');
        localStorage.removeItem('colorPreference');
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const userSession=  localStorage.getItem('userSession');
  return (
    <AppBar position="static">
      <Toolbar>
        <ColorPicker />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sapiens
        </Typography>
        {!userSession ? (
          <Button color="inherit" onClick={goToLoginPage}>
            Login
          </Button>
        ) : (
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              Hello, {userSession}
            </Typography>
            <Button color="inherit" onClick={logoutCurrentUser}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
