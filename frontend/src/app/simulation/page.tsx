'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PushUniversalAccountButton } from '@pushchain/ui-kit';

export default function SimulationPage() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    {
      id: 'phishing',
      title: 'Phishing Attack',
      description: 'Detects malicious contracts attempting to steal your tokens through fake approvals',
      icon: '🎣',
      risk: 'High',
      color: 'bg-red-500',
      details: 'Phishing attacks in Web3 typically involve malicious contracts that trick users into approving token spending permissions. Once approved, attackers can drain wallets of all tokens.'
    },
    {
      id: 'unlimited-approval',
      title: 'Unlimited Token Approval',
      description: 'Identifies dangerous unlimited token approvals that could drain your wallet',
      icon: '🔓',
      risk: 'Critical',
      color: 'bg-red-600',
      details: 'Unlimited token approvals give contracts permission to spend all of your tokens of a specific type. This is extremely dangerous as a compromised or malicious contract could drain your entire balance.'
    },
    {
      id: 'suspicious-contract',
      title: 'Suspicious Contract',
      description: 'Flags interactions with unverified or recently deployed contracts',
      icon: '⚠️',
      risk: 'Medium',
      color: 'bg-yellow-500',
      details: 'Unverified contracts have not been audited or reviewed by the community. Recently deployed contracts may be more likely to be malicious as they have not had time to build a reputation.'
    },
    {
      id: 'high-value-transfer',
      title: 'High-Value Transfer',
      description: 'Alerts on large transfers to unknown addresses',
      icon: '💰',
      risk: 'High',
      color: 'bg-red-500',
      details: 'Large transfers to unknown addresses can indicate theft or compromised accounts. PushGuard monitors transfer amounts relative to your typical activity to detect anomalies.'
    }
  ];

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
            <a href="#" className="text-white hover:text-cyan-200 transition-colors">Documentation</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <PushUniversalAccountButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">🛡️ Threat Simulation Center</h1>
          <p className="text-xl text-white">
            Experience how PushGuard detects and prevents various types of wallet threats in real-time
          </p>
        </div>

        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Select a Threat Scenario</h2>
          <p className="mb-8 text-white">
            Choose from common attack vectors to see how PushGuard protects your digital assets
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => (
              <div 
                key={scenario.id}
                className="card p-6 cursor-pointer transition-all hover:scale-105"
                onClick={() => setSelectedScenario(scenario.id)}
                style={{ backgroundColor: 'rgba(16, 24, 40, 0.9)' }}
              >
                <div className="flex items-start">
                  <div className="text-3xl mr-4">{scenario.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${scenario.color}`}>
                        {scenario.risk}
                      </span>
                    </div>
                    <p className="text-white">{scenario.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedScenario && (
          <div className="card p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {scenarios.find(s => s.id === selectedScenario)?.title} Simulation
                </h2>
                <p className="text-white">
                  {scenarios.find(s => s.id === selectedScenario)?.description}
                </p>
              </div>
              <button 
                onClick={() => setSelectedScenario(null)}
                className="text-white hover:text-cyan-200"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">About This Threat</h3>
              <p className="mb-4 text-white">
                {scenarios.find(s => s.id === selectedScenario)?.details}
              </p>
              
              <h3 className="text-lg font-bold text-white mb-4">Simulation Setup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-white mb-2">Wallet Address</label>
                  <div className="bg-gray-700 rounded px-4 py-2 text-white">
                    0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white mb-2">Network</label>
                  <div className="bg-gray-700 rounded px-4 py-2 text-white">
                    Ethereum Mainnet
                  </div>
                </div>
              </div>
              
              <button className="btn-primary py-3 px-6">
                Initiate Simulation
              </button>
            </div>
            
            <div className="flex space-x-4">
              <Link 
                href={`/simulation/${selectedScenario}`}
                className="btn-primary py-3 px-6 flex-1 text-center"
              >
                Start Interactive Demo
              </Link>
              <button className="btn-secondary py-3 px-6 flex-1">
                View Technical Details
              </button>
            </div>
          </div>
        )}

        <div className="card p-8 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">How PushGuard Protects You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Real-time Detection</h3>
              <p className="text-white">Monitors transactions 24/7 for suspicious patterns</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Alerts</h3>
              <p className="text-white">Sends immediate notifications via Push Protocol</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cross-chain Protection</h3>
              <p className="text-white">Works across Ethereum, Solana, and Push Chain</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4" style={{ backgroundColor: 'rgba(16, 24, 40, 0.8)' }}>
        <div className="container mx-auto max-w-6xl">
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