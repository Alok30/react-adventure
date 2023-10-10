import React, { useEffect, useState } from "react";
import axiosWrapper from "../util/axiosWrapper";
import { Menu, IconButton, Alert, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const ColorPicker = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  const userColorPreference=localStorage.getItem('colorPreference');
  const userName=localStorage.getItem('userSession');
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setError("");
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const updateColorPreference = async (newColor) => {
    try {
      const response = await axiosWrapper.put(
        `/preferences/${userName}`,
        {
          colorPreference: newColor,
        },
      );
      if (response.status === 200) {
        setShowAlert(true);
        localStorage.setItem('colorPreference', response.data.user.colorPreference);
      }
    } catch (error) {
      setError("Failed to update color preference.");
    }
  };

  const handleThemeChange = (themeColor) => {
    setShowAlert(false);
    document.documentElement.style.setProperty("--primary-color", themeColor);
    if (userName) {
      updateColorPreference(themeColor);
    }
    handleCloseMenu();
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      userColorPreference
    );
  }, [userColorPreference]);

  return (
    <React.Fragment>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleOpenMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleThemeChange("blue")}>
          Blue Theme
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("green")}>
          Green Theme
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("red")}>Red Theme</MenuItem>
      </Menu>
      {showAlert && <Alert severity="info">Color updated successfully!</Alert>}
      {error && <Alert severity="error">{error}</Alert>}{" "}
    </React.Fragment>
  );
};

export default ColorPicker;
