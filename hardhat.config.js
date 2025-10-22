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
      accounts: ["private key here"],
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