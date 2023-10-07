import React from "react";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import ColorPicker from "./ColorPickerHeader";
import axios from "axios";
import { userAppStore } from "../store";
import { BASE_URL } from "../constant";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isUserLogined } = userAppStore();
  const goToLoginPage = () => {
    navigate("login");
  };
  const logoutCurrentUser = async () => {
    const resp = await axios.get(`${BASE_URL}/logout`);
    console.log(resp)
    if (resp?.data?.message) {
      userAppStore.setState({
        isUserLogined:false
      })
    }
  };
  return (
    <div className="Container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Sapient
            </Typography>
            {!isUserLogined ? (
              <Button color="inherit" onClick={goToLoginPage}>
                Login
              </Button>
            ) : (
              <Button color="inherit" onClick={logoutCurrentUser}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <div className="App-header">
        <ColorPicker />
        <h1>Website with Color Picker</h1>
      </div>
    </div>
  );
};

export default Home;
