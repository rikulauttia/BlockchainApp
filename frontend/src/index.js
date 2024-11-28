import "./index.css"; // Optional, for global styles

import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

// Use React 18's createRoot API
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
