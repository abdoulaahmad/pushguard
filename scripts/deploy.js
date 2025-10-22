const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const PushGuard = await ethers.getContractFactory("PushGuard");
  const pushGuard = await PushGuard.deploy();

  await pushGuard.deployed();

  console.log("PushGuard deployed to:", pushGuard.address);
  
  // Save the address to a file for the frontend
  const fs = require('fs');
  const path = require('path');
  
  // Read existing addresses if they exist
  let existingAddresses = {};
  const addressesPath = path.join(__dirname, '..', 'frontend', 'src', 'lib', 'contract-addresses.json');
  
  if (fs.existsSync(addressesPath)) {
    const existingData = fs.readFileSync(addressesPath, 'utf8');
    existingAddresses = JSON.parse(existingData);
  }
  
  // Update with new deployment
  const addressData = {
    ...existingAddresses,
    pushchain: pushGuard.address,
    latest: pushGuard.address
  };
  
  // Ensure directory exists
  const dir = path.dirname(addressesPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(addressesPath, JSON.stringify(addressData, null, 2));
  
  console.log("Contract addresses saved to frontend/src/lib/contract-addresses.json");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });