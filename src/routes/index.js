import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../screens/dashboard/dashboard";
import Login from "../screens/login/login";

function Routes1() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Routes1;
