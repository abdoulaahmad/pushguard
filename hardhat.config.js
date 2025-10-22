require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.22",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    pushchain: {
      url: "https://evm.rpc-testnet-donut-node1.push.org",
      accounts: ["30e7120cd6cf02f07dd245334c34f76ef9b5b82f5fe3a9fd518647344bd4936f"],
      chainId: 42101,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};