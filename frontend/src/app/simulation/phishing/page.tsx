'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PushUniversalAccountButton } from '@pushchain/ui-kit';

export default function PhishingSimulation() {
  const [step, setStep] = useState(0);
  const [notificationSent, setNotificationSent] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const sendNotification = () => {
    setNotificationSent(true);
    setTimeout(() => {
      setStep(3);
    }, 1500);
  };

  const blockTransaction = () => {
    setBlocked(true);
    setStep(4);
  };

  const allowTransaction = () => {
    setAllowed(true);
    setStep(4);
  };

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        sendNotification();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

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
            <Link href="/dashboard" className="text-white hover:text-cyan-200 transition-colors">Dashboard</Link>
            <Link href="/simulation" className="text-white hover:text-cyan-200 transition-colors">Simulation</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <PushUniversalAccountButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">🎣 Phishing Attack Simulation</h1>
          <Link href="/simulation" className="text-white hover:text-cyan-200">
            ← Back to Scenarios
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="card p-6 mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= num - 1 ? 'bg-cyan-500 text-white' : 'bg-gray-600 text-gray-300'
                }`}>
                  {num}
                </div>
                {num < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step >= num ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-white">
              {step === 0 && 'Setup Simulation'}
              {step === 1 && 'Initiate Transaction'}
              {step === 2 && 'Threat Detection'}
              {step === 3 && 'User Decision'}
              {step === 4 && blocked ? 'Transaction Blocked' : allowed ? 'Transaction Allowed' : 'Simulation Complete'}
            </p>
          </div>
        </div>

        {/* Simulation Content */}
        <div className="card p-8 mb-8">
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Phishing Attack Scenario</h2>
              <p className="mb-6 text-white">
                In this simulation, you'll experience how PushGuard detects and prevents a common phishing attack 
                where a malicious contract attempts to steal your tokens through a fake token approval request.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Scenario Details</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 text-white">Threat Type:</span>
                    <span className="text-white">Phishing Attack</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-white">Risk Level:</span>
                    <span className="text-red-400 font-bold">High</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-white">Potential Loss:</span>
                    <span className="text-white">All tokens in wallet</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-white">Detection Method:</span>
                    <span className="text-white">Contract verification & pattern analysis</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={nextStep}
                className="btn-primary py-3 px-6"
              >
                Start Simulation
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Initiate Transaction</h2>
              <p className="mb-6 text-white">
                You're about to approve a token spending request. This is what a user would see in their wallet.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="border border-gray-600 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Token Approval Request</h3>
                    <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Ethereum</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-white">Contract Address</label>
                      <div className="text-white break-all bg-gray-700 p-2 rounded mt-1">
                        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-white">Token</label>
                      <div className="flex items-center mt-1">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs">ETH</span>
                        </div>
                        <span className="text-white">Ethereum (ETH)</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-white">Amount</label>
                      <div className="text-white mt-1">
                        Unlimited approval
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-white">Description</label>
                      <div className="text-white mt-1">
                        "Approve tokens for Uniswap V2 Router" - This is a FAKE description!
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={nextStep}
                    className="btn-primary py-3 px-6 flex-1"
                  >
                    Sign Transaction
                  </button>
                  <button 
                    onClick={prevStep}
                    className="btn-secondary py-3 px-6 flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Threat Detection in Progress</h2>
              <p className="mb-6 text-white">
                PushGuard is analyzing this transaction for potential threats...
              </p>
              
              <div className="flex justify-center my-8">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Analysis in Progress</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3 animate-pulse"></div>
                    <span className="text-white">Checking contract verification status...</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3 animate-pulse"></div>
                    <span className="text-white">Analyzing transaction patterns...</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3 animate-pulse"></div>
                    <span className="text-white">Cross-referencing with threat database...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">⚠️ Threat Detected!</h2>
              <p className="mb-6 text-white">
                PushGuard has identified this as a potential phishing attack!
              </p>
              
              {notificationSent && (
                <div className="bg-blue-900 border border-blue-700 rounded-lg p-4 mb-6 animate-pulse">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-bold text-blue-200">Push Notification Received</h3>
                      <div className="mt-2 text-sm text-blue-200">
                        <p>Potential phishing attack detected on your wallet!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-red-900 border border-red-700 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Threat Analysis</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 text-red-300">Threat Type:</span>
                    <span className="text-white">Phishing Attack</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-red-300">Risk Level:</span>
                    <span className="text-red-400 font-bold">High</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-red-300">Red Flags:</span>
                    <div className="text-white">
                      <div>• Contract not verified on Etherscan</div>
                      <div>• Recently deployed (2 days ago)</div>
                      <div>• Unlimited token approval requested</div>
                      <div>• Fake Uniswap description</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">What Would You Like to Do?</h3>
                <div className="flex space-x-4">
                  <button 
                    onClick={blockTransaction}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md font-medium flex-1 transition-colors"
                  >
                    Block Transaction (Recommended)
                  </button>
                  <button 
                    onClick={allowTransaction}
                    className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-md font-medium flex-1 transition-colors"
                  >
                    Allow Transaction
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {blocked ? '✅ Transaction Blocked' : '⚠️ Transaction Allowed'}
              </h2>
              
              {blocked ? (
                <div>
                  <p className="mb-6 text-white">
                    Excellent choice! You've successfully prevented a potential phishing attack.
                  </p>
                  
                  <div className="bg-green-900 border border-green-700 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold text-white mb-4">Impact Prevention</h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="w-32 text-green-300">Tokens Saved:</span>
                        <span className="text-white">All tokens in your wallet</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 text-green-300">Estimated Value:</span>
                        <span className="text-white">$5,230.75</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 text-green-300">Attack Type:</span>
                        <span className="text-white">Phishing / Token Theft</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-6 text-white">
                    You've chosen to proceed with the transaction. In a real scenario, this could result in loss of funds.
                  </p>
                  
                  <div className="bg-red-900 border border-red-700 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold text-white mb-4">Potential Consequences</h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <span className="w-32 text-red-300">Tokens at Risk:</span>
                        <span className="text-white">All tokens in your wallet</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 text-red-300">Estimated Loss:</span>
                        <span className="text-white">$5,230.75</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 text-red-300">Attack Type:</span>
                        <span className="text-white">Phishing / Token Theft</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Key Takeaways</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-white">Always verify contract addresses before approving token spending</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-white">Be cautious of unlimited token approvals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-white">Check contract verification status on blockchain explorers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-white">Use PushGuard to automatically detect these threats</span>
                  </li>
                </ul>
                
                <div className="flex space-x-4 mt-6">
                  <Link 
                    href="/simulation"
                    className="btn-primary py-3 px-6"
                  >
                    Try Another Scenario
                  </Link>
                  <Link 
                    href="/dashboard"
                    className="btn-secondary py-3 px-6"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-white mb-4">About Phishing Attacks</h3>
          <p className="mb-4 text-white">
            Phishing attacks in Web3 typically involve malicious contracts that trick users into approving 
            token spending permissions. Once approved, attackers can drain wallets of all tokens.
          </p>
          <p className="text-white">
            PushGuard protects against these attacks by analyzing contract verification status, deployment 
            history, and transaction patterns to identify potential threats before they can cause damage.
          </p>
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
              <a href="#" className="text-white hover:text-cyan-200 transition-colors">Twitter</a>
              <a href="#" className="text-white hover:text-cyan-200 transition-colors">GitHub</a>
              <a href="#" className="text-white hover:text-cyan-200 transition-colors">Discord</a>
              <a href="#" className="text-white hover:text-cyan-200 transition-colors">Docs</a>
            </div>
          </div>
          
          <div className="border-t border-cyan-800 mt-6 pt-6 text-center">
            <p className="text-white">
              © {new Date().getFullYear()} PushGuard. All rights reserved. Built with ❤️ for the Web3 community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}