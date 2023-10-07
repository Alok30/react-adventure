import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignInPage from "./components/SignIn";
import Home from "./components/Home";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
    <Routes>
      <Route path="/signup" element={<SignUp/>} exact />
      <Route path="/login" element={<SignInPage/>} exact/>
      <Route path="/" element={<Home/>}  exact/>
    </Routes>
  </Router>
  </React.StrictMode>
);


