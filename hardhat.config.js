require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const CSC_RPC_URL = process.env.CSC_RPC_TEST_URL;
const CSC_PRIVATE_KEY = process.env.CSC_PRIVATE_KEY;

module.exports = {
  defaultNetwork : "hardhat",
  networks: {
    localhost : {
      url : "http://127.0.0.1:8545",
      chainId : 31337,
    },
    CSC : {
      url : CSC_RPC_URL,
      accounts : [CSC_PRIVATE_KEY],
      chainID : 53
    }
  },
  solidity: "0.8.6",
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
  }
};
