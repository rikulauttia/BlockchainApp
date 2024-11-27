import React, { useState } from "react";

import { ethers } from "ethers";

import getMarketplaceContract from "../ethereum/Marketplace";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const createProduct = async (e) => {
    e.preventDefault();
    const contract = getMarketplaceContract();
    const transaction = await contract.createProduct(
      name,
      ethers.utils.parseEther(price)
    );
    await transaction.wait();
    setName("");
    setPrice("");
  };

  return (
    <div>
      <h1>Create a New Product</h1>
      <form onSubmit={createProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price in ETH"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default Dashboard;
