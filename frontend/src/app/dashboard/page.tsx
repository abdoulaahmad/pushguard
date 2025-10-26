'use client';

import { useState, useEffect, useCallback } from 'react';
import contractAddresses from '@/lib/contract-addresses.json';
import { usePushChainClient, usePushWalletContext, PushUniversalAccountButton, PushUI } from '@pushchain/ui-kit';
import { PushAPI } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import Link from 'next/link';

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

  // Check guard status when account is connected
  const checkGuardStatus = useCallback(async () => {
    if (!pushChainClient || !account) return;
    
    try {
      console.log('Checking guard status for chain:', chainInfo);
      
      // In a real implementation, we would determine the correct contract address based on chain
      const contractAddress = contractAddresses.pushchain; // Default to Push Chain deployment
      console.log('Initializing contract at address:', contractAddress);
      
      // Create a contract instance to read from
      const provider = new ethers.JsonRpcProvider('https://evm.rpc-testnet-donut-node1.push.org');
      const contractInstance = new ethers.Contract(contractAddress, PUSH_GUARD_ABI, provider);
      
      // Check if guard is active for this chain
      const isActive = await contractInstance.isGuardActive(chainInfo.namespace, chainInfo.id);
      console.log('Guard status:', isActive);
      setIsGuardActive(isActive);
    } catch (error) {
      console.error('Error checking guard status:', error);
    }
  }, [pushChainClient, account, chainInfo]);

  useEffect(() => {
    if (account) {
      checkGuardStatus();
    }
  }, [account, checkGuardStatus]);

  const toggleGuard = async () => {
    if (!pushChainClient || !account) return;
    
    setLoading(true);
    try {
      console.log('Toggling guard status to:', !isGuardActive);
      
      // In a real implementation, we would determine the correct contract address based on chain
      const contractAddress = contractAddresses.pushchain; // Default to Push Chain deployment
      
      // Encode the function call
      const abiInterface = new ethers.Interface(PUSH_GUARD_ABI);
      const data = abiInterface.encodeFunctionData('toggleGuard', [!isGuardActive]) as `0x${string}`;
      
      // Send transaction using Push Chain client
      const tx = await pushChainClient.universal.sendTransaction({
        to: contractAddress as `0x${string}`,
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
    if (!pushChainClient || !account) return;
    
    setLoading(true);
    try {
      console.log('Simulating threat detection');
      
      // In a real implementation, we would determine the correct contract address based on chain
      const contractAddress = contractAddresses.pushchain; // Default to Push Chain deployment
      
      // Encode the function call
      const abiInterface = new ethers.Interface(PUSH_GUARD_ABI);
      const data = abiInterface.encodeFunctionData('reportThreat', [
        'High-value approval',
        'Suspicious contract approved to spend tokens'
      ]) as `0x${string}`;
      
      // Send transaction using Push Chain client
      const tx = await pushChainClient.universal.sendTransaction({
        to: contractAddress as `0x${string}`,
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
          channel: `eip155:11155111:${contractAddress}`, // Channel would be the contract address
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--primary-bg)' }}>
      {/* Header */}
      <header className="py-5" style={{ backgroundColor: '#101828' }}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: '#101828' }}>PG</span>
            </div>
            <h1 className="text-2xl font-bold text-white">PushGuard</h1>
          </div>
          
          <nav className="flex space-x-6">
            <Link href="/" className="text-white hover:text-cyan-200 transition-colors">Home</Link>
            <Link href="/simulation" className="text-white hover:text-cyan-200 transition-colors">Simulations</Link>
            <a href="#" className="text-white hover:text-cyan-200 transition-colors">Documentation</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <PushUniversalAccountButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">🛡️ PushGuard Dashboard</h1>
        </div>

        {/* Wallet Connection */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Wallet Connection</h2>
              {account ? (
                <p className="text-cyan-200">Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</p>
              ) : (
                <p className="text-cyan-200">Connect your wallet to get started</p>
              )}
            </div>
            <div>
              <PushUniversalAccountButton />
            </div>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-500 text-white rounded-md text-sm">
              Error: {error.message || 'Failed to connect wallet'}
            </div>
          )}
        </div>

        {account && (
          <>
            <div className="card p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Wallet Protection</h2>
                  <p className="text-cyan-200">Protect your wallet across all chains</p>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    isGuardActive 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {isGuardActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-white">Chain</span>
                  <span className="text-sm text-cyan-200">
                    {chainInfo.namespace}:{chainInfo.id}
                  </span>
                </div>
                <div className="text-xs text-cyan-200">
                  Universal Execution Account: {account}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={toggleGuard}
                  disabled={loading}
                  className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                    isGuardActive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : isGuardActive ? 'Disable Guard' : 'Enable Guard'}
                </button>
                
                <button
                  onClick={simulateThreat}
                  disabled={loading}
                  className={`py-3 px-4 rounded-md font-medium transition-all bg-yellow-500 hover:bg-yellow-600 text-white ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Simulate Threat
                </button>
              </div>
            </div>

            {threats.length > 0 && (
              <div className="card p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Threats Detected</h3>
                <div className="space-y-3">
                  {threats.map((threat, index) => (
                    <div key={index} className="flex items-start p-3 rounded-md" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                      <div className="flex-shrink-0">
                        <span className="text-red-500 text-xl">⚠️</span>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-white capitalize">{threat.type}</p>
                        <p className="text-sm text-cyan-200">{threat.details}</p>
                        <p className="text-xs text-red-300 mt-1">
                          {threat.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Threat Simulation Section */}
            <div className="card p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Threat Simulation</h3>
              <p className="text-cyan-200 mb-4">
                Experience how PushGuard detects and prevents various types of wallet threats in real-time.
              </p>
              <Link href="/simulation" className="btn-primary py-3 px-6 inline-block">
                Explore Threat Scenarios
              </Link>
            </div>
          </>
        )}

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <span className="ml-3 text-cyan-200">Detects phishing attempts and malicious transactions</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <span className="ml-3 text-cyan-200">Monitors unlimited token approvals across all chains</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <span className="ml-3 text-cyan-200">Sends real-time alerts via Push Protocol notifications</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <span className="ml-3 text-cyan-200">Works natively with Ethereum, Solana, and Push Chain</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4" style={{ backgroundColor: 'rgba(16, 24, 40, 0.8)' }}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-lg font-bold" style={{ color: '#101828' }}>PG</span>
              </div>
              <h3 className="text-xl font-bold text-white">PushGuard</h3>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-cyan-200 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-cyan-200 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-cyan-200 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-cyan-200 hover:text-white transition-colors">Docs</a>
            </div>
          </div>
          
          <div className="border-t border-cyan-800 mt-6 pt-6 text-center">
            <p className="text-cyan-200">
              © {new Date().getFullYear()} PushGuard. All rights reserved. Built with ❤️ for the Web3 community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}