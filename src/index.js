import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./components/reportWebVitals";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
