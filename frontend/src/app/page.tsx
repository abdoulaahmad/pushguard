'use client';

import { useState, useEffect, useCallback } from 'react';
import contractAddresses from '@/lib/contract-addresses.json';
import { usePushChainClient, usePushWalletContext, PushUniversalAccountButton, PushUI } from '@pushchain/ui-kit';
import { PushAPI } from '@pushprotocol/restapi';
import { ethers } from 'ethers';

// PushGuard contract ABI with only the methods we need
const PUSH_GUARD_ABI = [
  "function toggleGuard(bool enable) public",
  "function isGuardActive(string chainNamespace, string chainId) public view returns (bool)",
  "function reportThreat(string memory threatType, string memory details) public",
  "event GuardToggled(bool newStatus, address indexed caller, string chainNamespace, string chainId)",
  "event ThreatDetected(address indexed caller, string threatType, string details, string chainNamespace, string chainId)"
];

export default function Dashboard() {
  const { pushChainClient, error, isInitialized } = usePushChainClient();
  const { connectionStatus } = usePushWalletContext();
  const [account, setAccount] = useState<string | null>(null);
  const [isGuardActive, setIsGuardActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chainInfo, setChainInfo] = useState({ namespace: 'push', id: '9000' });
  const [threats, setThreats] = useState<any[]>([]);
  const [contract, setContract] = useState<string | null>(null);

  // Detect user's chain when they connect
  useEffect(() => {
    if (pushChainClient && isInitialized && connectionStatus === PushUI.CONSTANTS.CONNECTION.STATUS.CONNECTED) {
      // Get the actual account from the client
      const clientAccount = (pushChainClient as any)?.universal?.account || null;
      setAccount(clientAccount);
      
      // In a real implementation, we would detect the actual chain
      // For now, we'll use default values for Push Chain testnet
      setChainInfo({ namespace: 'push', id: '9000' });
    } else {
      setAccount(null);
    }
  }, [pushChainClient, isInitialized, connectionStatus]);

  // Initialize contract when account is connected
  useEffect(() => {
    if (pushChainClient && account) {
      try {
        // In a real implementation, we would determine the correct contract address based on chain
        const contractAddress = contractAddresses.pushchain; // Default to Push Chain deployment
        console.log('Initializing contract at address:', contractAddress);
        setContract(contractAddress);
      } catch (err) {
        console.error('Error initializing contract:', err);
      }
    } else {
      setContract(null);
    }
  }, [pushChainClient, account]);

  // Check guard status when contract is initialized
  const checkGuardStatus = useCallback(async () => {
    if (!pushChainClient || !contract) return;
    
    try {
      console.log('Checking guard status for chain:', chainInfo);
      
      // Create a contract instance to read from
      const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org');
      const contractInstance = new ethers.Contract(contract, PUSH_GUARD_ABI, provider);
      
      // Check if guard is active for this chain
      const isActive = await contractInstance.isGuardActive(chainInfo.namespace, chainInfo.id);
      console.log('Guard status:', isActive);
      setIsGuardActive(isActive);
    } catch (error) {
      console.error('Error checking guard status:', error);
    }
  }, [pushChainClient, contract, chainInfo]);

  useEffect(() => {
    if (contract) {
      checkGuardStatus();
    }
  }, [contract, checkGuardStatus]);

  const toggleGuard = async () => {
    if (!pushChainClient || !contract) return;
    
    setLoading(true);
    try {
      console.log('Toggling guard status to:', !isGuardActive);
      
      // Encode the function call
      const abiInterface = new ethers.Interface(PUSH_GUARD_ABI);
      const data = abiInterface.encodeFunctionData('toggleGuard', [!isGuardActive]) as `0x${string}`;
      
      // Send transaction using Push Chain client
      const tx = await pushChainClient.universal.sendTransaction({
        to: contract as `0x${string}`,
        data: data
      });
      
      console.log('Transaction sent:', tx);
      
      // Wait for transaction confirmation
      // In a real implementation, we would wait for the transaction to be mined
      // For now, we'll just update the UI after a short delay to simulate confirmation
      setTimeout(() => {
        setIsGuardActive(!isGuardActive);
        // Re-check the status from the contract after the transaction
        setTimeout(() => {
          checkGuardStatus();
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error('Error toggling guard:', error);
    } finally {
      setLoading(false);
    }
  };

  const simulateThreat = async () => {
    if (!pushChainClient || !contract) return;
    
    setLoading(true);
    try {
      console.log('Simulating threat detection');
      
      // Encode the function call
      const abiInterface = new ethers.Interface(PUSH_GUARD_ABI);
      const data = abiInterface.encodeFunctionData('reportThreat', [
        'High-value approval',
        'Suspicious contract approved to spend tokens'
      ]) as `0x${string}`;
      
      // Send transaction using Push Chain client
      const tx = await pushChainClient.universal.sendTransaction({
        to: contract as `0x${string}`,
        data: data
      });
      
      console.log('Threat report transaction sent:', tx);
      
      // Add to threats list for UI display
      const newThreat = {
        type: 'High-value approval',
        timestamp: new Date(),
        details: 'Suspicious contract approved to spend tokens'
      };
      
      setThreats(prev => [newThreat, ...prev]);
      
      // Send Push notification
      try {
        // In a real implementation, we would send an actual Push notification
        console.log('Sending Push notification about threat');
        // This would be the real call:
        /*
        const signer = pushChainClient.signer;
        await PushAPI.payloads.sendNotification({
          signer: signer,
          channel: `eip155:11155111:${contract}`, // Channel would be the contract address
          recipients: [`eip155:11155111:${account}`], // Recipient would be the user
          title: "⚠️ PushGuard Alert",
          body: "You just approved tokens to a suspicious contract. Review this transaction."
        });
        */
      } catch (notificationError) {
        console.error('Error sending Push notification:', notificationError);
      }
    } catch (error) {
      console.error('Error simulating threat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🛡️ PushGuard</h1>
          <p className="text-lg text-gray-600 mb-8">Universal Wallet Guardian</p>
        </div>

        {/* Wallet Connection */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Wallet Connection</h2>
              {account ? (
                <p className="text-gray-600">Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</p>
              ) : (
                <p className="text-gray-600">Connect your wallet to get started</p>
              )}
            </div>
            <div>
              <PushUniversalAccountButton />
            </div>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              Error: {error.message || 'Failed to connect wallet'}
            </div>
          )}
        </div>

        {account && (
          <>
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Wallet Protection</h2>
                  <p className="text-gray-600">Protect your wallet across all chains</p>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    isGuardActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {isGuardActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Chain</span>
                  <span className="text-sm text-gray-500">
                    {chainInfo.namespace}:{chainInfo.id}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Universal Execution Account: {account}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={toggleGuard}
                  disabled={loading || !pushChainClient || !contract}
                  className={`flex-1 py-3 px-4 rounded-md font-medium ${
                    isGuardActive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  } ${loading || !pushChainClient || !contract ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : isGuardActive ? 'Disable Guard' : 'Enable Guard'}
                </button>
                
                <button
                  onClick={simulateThreat}
                  disabled={loading || !pushChainClient || !contract}
                  className={`py-3 px-4 rounded-md font-medium bg-yellow-500 hover:bg-yellow-600 text-white ${
                    loading || !pushChainClient || !contract ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Simulate Threat
                </button>
              </div>
            </div>

            {threats.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Threats Detected</h3>
                <div className="space-y-3">
                  {threats.map((threat, index) => (
                    <div key={index} className="flex items-start p-3 bg-red-50 rounded-md">
                      <div className="flex-shrink-0">
                        <span className="text-red-500">⚠️</span>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-red-800 capitalize">{threat.type}</p>
                        <p className="text-sm text-red-700">{threat.details}</p>
                        <p className="text-xs text-red-500 mt-1">
                          {threat.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">How It Works</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Detects phishing attempts and malicious transactions</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Monitors unlimited token approvals across all chains</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Sends real-time alerts via Push Protocol notifications</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Works natively with Ethereum, Solana, and Push Chain</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}