import React from "react";
import Register from "./components/register";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Home";
import Profile from "./components/profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/profile" Component={Profile} />
      </Routes>
    </>
  );
};

export default App;
