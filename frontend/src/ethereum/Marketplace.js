import { BrowserProvider, Contract } from "ethers";

import MarketplaceAbi from "./Marketplace.json";

const getMarketplaceContract = async () => {
  try {
    if (!window.ethereum) {
      throw new Error(
        "MetaMask is not installed. Please install it to use this DApp."
      );
    }

    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractAddress = process.env.REACT_APP_MARKETPLACE_ADDRESS;
    if (!contractAddress) {
      throw new Error("Marketplace contract address is not defined in .env.");
    }

    console.log("Using contract address:", contractAddress);
    console.log("Using ABI:", MarketplaceAbi.abi);

    const contract = new Contract(contractAddress, MarketplaceAbi.abi, signer);
    console.log("Connected to Marketplace contract at:", contract.address);

    return contract;
  } catch (error) {
    console.error(
      "Error creating Marketplace contract instance:",
      error.message
    );
    throw error;
  }
};

export default getMarketplaceContract;
