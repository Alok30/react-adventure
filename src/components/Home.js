import React, { useEffect, useState } from "react";
import { Test } from "./test";
import "./Home.css";
// import Header from "./Header";
// import { userAppStore } from "../store";
// import axiosWrapper from "../util/axiosWrapper";
// import { useNavigate } from "react-router-dom";
const Home = () => {

  // const navigate = useNavigate();
  useEffect(() => {
    // axiosWrapper
    //   .get('/check-auth')
    //   .then((response) => {
    //     const result=response.data;
    //     if (response.status === 200) {
    //       userAppStore.setState({
    //         username:response.data.username,
    //       });
    //       localStorage.setItem('userSession',result.username);
    //       localStorage.setItem('colorPreference', result.colorPreference);
    //     } else {
    //       window.location.href = '/';
    //       localStorage.removeItem('userSession');
    //       localStorage.removeItem('colorPreference');
    //     }
    //   })
    //   .catch((error) => {
    //     navigate('/')
    //     localStorage.removeItem('userSession');
    //     localStorage.removeItem('colorPreference');
    //   });
  }, []);
  return (
    <div className="App-header">
      {/*<Header />*/}
      <Test />
    </div>
  );
};

export default Home;
