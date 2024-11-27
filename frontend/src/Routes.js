import React from "react";

import { Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import ProductListing from "./components/ProductListing";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<ProductListing />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default AppRoutes;
