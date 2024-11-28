import React, { useState } from "react";

// Updated imports for ethers v6
import { parseEther } from "ethers";

// Import the function to get the Marketplace contract
import getMarketplaceContract from "../ethereum/Marketplace";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const contract = getMarketplaceContract(); // Fetch the Marketplace contract instance
      const transaction = await contract.createProduct(
        name,
        parseEther(price) // Use `parseEther` from ethers v6
      );
      await transaction.wait(); // Wait for the transaction to be mined
      setName(""); // Reset the name input field
      setPrice(""); // Reset the price input field
      alert("Product created successfully!"); // Notify the user of success
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Check console for more details.");
    }
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
