import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ColorPicker from "./ColorPickerHeader";
import { userAppStore } from "../store";
import { BASE_URL } from "../constant";

const Header = () => {
  const navigate = useNavigate();
  const { isUserLogined, userName } = userAppStore();

  const goToLoginPage = () => {
    navigate("login");
  };

  const logoutCurrentUser = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/logout`);
      if (resp?.data?.message) {
        userAppStore.setState({
          isUserLogined: false,
        });
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <ColorPicker />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sapient
        </Typography>
        {!isUserLogined ? (
          <Button color="inherit" onClick={goToLoginPage}>
            Login
          </Button>
        ) : (
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="textPrimary">
              Hello, {userName}
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
