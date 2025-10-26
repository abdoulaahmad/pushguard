# PushGuard - Universal Wallet Guardian

PushGuard is a revolutionary security solution designed for the multi-chain future of Web3. Built on the Push Protocol ecosystem, it provides universal wallet protection across all major blockchain networks.

## Project Overview

PushGuard protects users from common Web3 threats including:
- Phishing attacks
- Unlimited token approvals
- Suspicious contract interactions
- High-value transfers to unknown addresses

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features

- Real-time threat detection
- Instant Push Protocol notifications
- Cross-chain protection (Ethereum, Solana, Push Chain)
- Interactive threat simulations
- Modern, responsive UI with Tailwind CSS

## Deploy on Vercel

The easiest way to deploy your PushGuard app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Sign up for a Vercel account
3. Create a new project and import your repository
4. Configure the project with these settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Deploy!

## Environment Variables

For production deployment, you may need to set environment variables in your Vercel project settings:
- `NEXT_PUBLIC_PUSH_CHAIN_RPC_URL` - RPC endpoint for Push Chain
- `NEXT_PUBLIC_CONTRACT_ADDRESS` - Address of the deployed PushGuard contract

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - React framework
- [Push Protocol](https://push.org) - Notification protocol for Web3
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Ethers.js](https://docs.ethers.io) - Ethereum JavaScript library