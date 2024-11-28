import React from "react";

import { Link, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import ProductListing from "./components/ProductListing";

const AppRoutes = () => {
  return (
    <div>
      {/* Navigation Links */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Product Listing</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
