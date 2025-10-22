const { ethers } = require("hardhat");

async function main() {
  // Use the deployed contract address
  const contractAddress = "0xCfa5FCa28132e8ee859cffE11bE915683FB796E7";
  
  // Get the contract ABI
  const [deployer] = await ethers.getSigners();
  const PushGuard = await ethers.getContractFactory("PushGuard");
  const pushGuard = PushGuard.attach(contractAddress);
  
  console.log("Interacting with PushGuard at:", contractAddress);
  console.log("Using account:", deployer.address);
  
  // Test toggling guard
  console.log("Toggling guard...");
  const tx = await pushGuard.toggleGuard(true);
  await tx.wait();
  console.log("Guard toggled successfully!");
  
  // Test reporting a threat
  console.log("Reporting threat...");
  const tx2 = await pushGuard.reportThreat("test", "This is a test threat");
  await tx2.wait();
  console.log("Threat reported successfully!");
  
  // Check if guard is active
  const isActive = await pushGuard.isGuardActive("push", "9000");
  console.log("Is guard active for push:9000?", isActive);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });