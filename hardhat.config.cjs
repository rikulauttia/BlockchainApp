require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {}, // Default Hardhat network
    localhost: {
      // Localhost configuration for running a local blockchain
      url: "http://127.0.0.1:8545",
    },
    goerli: {
      // Configuration for deploying to the Goerli testnet
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
