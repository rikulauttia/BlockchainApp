import React, { useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";

function App() {
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
          console.error("User denied wallet connection:", error);
        }
      } else {
        alert("Please install MetaMask to use this DApp!");
      }
    };
    connectWallet();
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
