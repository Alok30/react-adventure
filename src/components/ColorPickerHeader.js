import React, { useEffect, useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { userAppStore } from "../store";
import axios from "axios";
import { BASE_URL } from "../constant";
const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const { colorPreference } = userAppStore();
  console.log(colorPreference, "colorPreference");
  const updateColorPreference = async (newColor) => {
    const response = await axios.put(`${BASE_URL}/preferences/testuser1`, {
      // Your POST data goes here
      colorPreference: newColor,
    });
    console.log(response, "response");
  };
  const handleColorChange = (event) => {
    const newColor = event.target.value;
    console.log(newColor, "newColor");
    document.documentElement.style.setProperty("--primary-color", newColor);
    setSelectedColor(newColor);
    updateColorPreference(newColor);
  };

  const colorOptions = [
    { value: "", label: "Select a color" },
    { value: "#ff0000", label: "red" },
    { value: "#00ff00", label: "green" },
    { value: "#0000ff", label: "blue" },
  ];

  useEffect(() => {
    setSelectedColor(colorPreference);
  }, [colorPreference]);
  return (
    <div>
      <FormControl>
        <Select
          value={selectedColor}
          onChange={handleColorChange}
          displayEmpty
          inputProps={{ "aria-label": "Select a color" }}
        >
          {colorOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ColorPicker;
