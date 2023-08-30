import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts/app-layout";
import Users from "./pages/Auth/Users";


const App = () => {
  return (
    <>
      <AppLayout>
        <Users />
      </AppLayout>
    </>
  );
};

export default App;
