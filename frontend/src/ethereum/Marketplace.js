import { ethers } from "ethers";

import MarketplaceAbi from "./Marketplace.json";

const getMarketplaceContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = process.env.REACT_APP_MARKETPLACE_ADDRESS;
  return new ethers.Contract(contractAddress, MarketplaceAbi, signer);
};

export default getMarketplaceContract;
