'use client';

import { useState, useEffect } from 'react';
import { PushUniversalAccountButton } from '@pushchain/ui-kit';
import Link from 'next/link';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--primary-bg)' }}>
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-opacity-90 backdrop-blur-md' : 'py-5'}`} 
              style={{ backgroundColor: isScrolled ? 'rgba(16, 24, 40, 0.9)' : '#101828' }}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: '#101828' }}>PG</span>
            </div>
            <h1 className="text-2xl font-bold text-white">PushGuard</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-white hover:text-cyan-200 transition-colors">Features</a>
            <a href="#how-it-works" className="text-white hover:text-cyan-200 transition-colors">How It Works</a>
            <a href="#about" className="text-white hover:text-cyan-200 transition-colors">About</a>
            <Link href="/simulation" className="text-white hover:text-cyan-200 transition-colors">Simulations</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <PushUniversalAccountButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span style={{ color: '#101828' }}>Universal Wallet</span> <span className="text-cyan-200">Guardian</span>
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: '#101828' }}>
            One guard. All chains. Zero compromises. Protect your digital assets across Ethereum, Solana, and Push Chain with cutting-edge security.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard" className="btn-primary text-lg py-3 px-8">
              Access Dashboard
            </Link>
            <Link href="/simulation" className="btn-secondary text-lg py-3 px-8">
              View Threat Simulations
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#101828' }}>Powerful Security Features</h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#101828' }}>
              Advanced protection mechanisms designed for the multi-chain future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-8 text-center" style={{ backgroundColor: 'rgba(16, 24, 40, 0.8)' }}>
              <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Threat Detection</h3>
              <p style={{ color: '#101828' }}>
                Advanced algorithms monitor your transactions 24/7, detecting phishing attempts and malicious activities instantly.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card p-8 text-center" style={{ backgroundColor: 'rgba(16, 24, 40, 0.8)' }}>
              <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Push Notifications</h3>
              <p style={{ color: '#101828' }}>
                Receive real-time alerts via Push Protocol when suspicious activities are detected, giving you immediate control.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card p-8 text-center" style={{ backgroundColor: 'rgba(16, 24, 40, 0.8)' }}>
              <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cross-Chain Protection</h3>
              <p style={{ color: '#101828' }}>
                Unified security across Ethereum, Solana, and Push Chain ecosystems with a single, intuitive interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4" style={{ backgroundColor: '#101828' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How PushGuard Works</h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Simple setup, powerful protection for all your digital assets
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h3>
              <p className="text-white">
                Securely connect your wallet with our Universal Execution Account technology for seamless cross-chain protection.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Activate Protection</h3>
              <p className="text-white">
                Enable guard mode with one click to start monitoring all your transactions across supported chains.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Stay Protected</h3>
              <p className="text-white">
                Receive instant alerts for suspicious activities and take immediate action to protect your assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#101828' }}>About PushGuard</h2>
              <p className="text-lg mb-6" style={{ color: '#101828' }}>
                PushGuard is a revolutionary security solution designed for the multi-chain future of Web3. 
                Built on the Push Protocol ecosystem, it provides universal wallet protection across all major blockchain networks.
              </p>
              <p className="text-lg mb-6" style={{ color: '#101828' }}>
                Our mission is to make Web3 safer for everyone by providing intuitive, powerful security tools 
                that protect users without compromising their experience.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                  <span style={{ color: '#101828' }}>Cross-chain compatibility</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                  <span style={{ color: '#101828' }}>Real-time monitoring</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                  <span style={{ color: '#101828' }}>Push Protocol integration</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Why Choose PushGuard?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-cyan-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-white">Zero-knowledge architecture for maximum privacy</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-cyan-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-white">Open-source and community audited</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-cyan-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-white">No subscription fees - pay only for transactions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-cyan-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-white">24/7 monitoring with machine learning detection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Wallet?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#101828' }}>
            Join thousands of users protecting their digital assets with PushGuard today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard" className="btn-primary text-lg py-4 px-10">
              Get Started Now
            </Link>
            <Link href="/simulation" className="btn-secondary text-lg py-4 px-10">
              View Threat Simulations
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4" style={{ backgroundColor: 'rgba(16, 24, 40, 0.8)' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: '#101828' }}>PG</span>
              </div>
              <h3 className="text-2xl font-bold text-white">PushGuard</h3>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" style={{ color: '#101828' }} className="hover:text-white transition-colors">Twitter</a>
              <a href="#" style={{ color: '#101828' }} className="hover:text-white transition-colors">GitHub</a>
              <a href="#" style={{ color: '#101828' }} className="hover:text-white transition-colors">Discord</a>
              <a href="#" style={{ color: '#101828' }} className="hover:text-white transition-colors">Docs</a>
            </div>
          </div>
          
          <div className="border-t border-cyan-800 mt-8 pt-8 text-center">
            <p style={{ color: '#101828' }}>
              © {new Date().getFullYear()} PushGuard. All rights reserved. Built with ❤️ for the Web3 community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}