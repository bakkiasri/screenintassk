import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import New from "./pages/new";
import Assets from "./pages/assets";
import Transfer from "./pages/Transfer";
import Purchase from "./pages/Purchase";
import Assignment from "./pages/Assignment";
import Expenditure from "./pages/Expenditure";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/expenditure" element={<Expenditure />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
