import React, { useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";

function App() {
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
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
