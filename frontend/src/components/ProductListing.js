import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

import getMarketplaceContract from "../ethereum/Marketplace";

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const contract = getMarketplaceContract();
      const productCount = await contract.productCount();
      const productsArray = [];
      for (let i = 1; i <= productCount; i++) {
        const product = await contract.products(i);
        productsArray.push(product);
      }
      setProducts(productsArray);
    };
    loadProducts();
  }, []);

  const buyProduct = async (product) => {
    const contract = getMarketplaceContract();
    const transaction = await contract.purchaseProduct(product.id, {
      value: product.price.toString(),
    });
    await transaction.wait();
    window.location.reload();
  };

  return (
    <div>
      <h1>Product Listings</h1>
      <ul>
        {products.map((product, idx) => (
          <li key={idx}>
            {product.name} - {ethers.utils.formatEther(product.price)} ETH
            {product.buyer === ethers.constants.AddressZero && (
              <button onClick={() => buyProduct(product)}>Buy</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
