import { ethers } from 'ethers';

// Watch for approval events on ERC-20 tokens
export const watchApprovals = (
  address: string, 
  onApproval: (log: any) => void
) => {
  // Using Sepolia testnet RPC endpoint
  const provider = new ethers.JsonRpcProvider('https://ethereum-sepolia.rpc.subquery.network/public');
  
  // Example with USDC contract on Sepolia
  const filter = {
    address: '0x1c7D4B196Cb0C7B01d743Fbc6116a89940E94B31', // USDC on Sepolia
    topics: [
      ethers.id('Approval(address,address,uint256)'),
      ethers.zeroPadValue(address, 32),
    ],
  };

  provider.on(filter, onApproval);
  
  // Return a function to stop watching
  return () => {
    provider.off(filter, onApproval);
  };
};

// Watch for transfer events that might indicate threats
export const watchTransfers = (
  address: string,
  onTransfer: (log: any) => void
) => {
  const provider = new ethers.JsonRpcProvider('https://ethereum-sepolia.rpc.subquery.network/public');
  
  // Listen to all transfer events where the user is the sender
  const filter = {
    topics: [
      ethers.id('Transfer(address,address,uint256)'),
      ethers.zeroPadValue(address, 32),
    ],
  };

  provider.on(filter, onTransfer);
  
  // Return a function to stop watching
  return () => {
    provider.off(filter, onTransfer);
  };
};

// Check for potentially dangerous contract interactions
export const checkContractSafety = async (
  contractAddress: string
) => {
  // In a real implementation, this would check against known malicious contract databases
  // For now, we'll return a mock result
  return {
    isSafe: true,
    riskLevel: 'low',
    warnings: [] as string[],
  };
};