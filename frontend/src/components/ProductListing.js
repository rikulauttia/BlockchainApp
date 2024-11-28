import React, { useEffect, useState } from "react";

// Updated imports for ethers v6
import { formatEther, ZeroAddress } from "ethers";

// Import the function to get the Marketplace contract
import getMarketplaceContract from "../ethereum/Marketplace";

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const contract = await getMarketplaceContract();
        const productCount = await contract.productCount();

        const productsArray = [];
        for (let i = 1; i <= productCount; i++) {
          const product = await contract.products(i);
          productsArray.push(product);
        }

        setProducts(productsArray);
      } catch (error) {
        console.error("Error loading products:", error.message);
      }
    };
    loadProducts();
  }, []);

  const buyProduct = async (product) => {
    try {
      const contract = await getMarketplaceContract();
      const transaction = await contract.purchaseProduct(product.id, {
        value: product.price,
      });
      await transaction.wait();
      alert("Product purchased successfully!");
      window.location.reload(); // Reload the page to refresh product status
    } catch (error) {
      console.error("Error buying product:", error.message);
      alert("Failed to purchase product. Check console for more details.");
    }
  };

  return (
    <div>
      <h1>Product Listings</h1>
      <ul>
        {products.map((product, idx) => (
          <li key={idx}>
            {product.name} - {formatEther(product.price)} ETH
            {product.buyer === ZeroAddress && (
              <button onClick={() => buyProduct(product)}>Buy</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
