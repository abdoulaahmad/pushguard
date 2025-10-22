# 🛡️ PushGuard - Universal Wallet Guardian

PushGuard is a cross-chain wallet security application built on Push Chain that protects users from phishing, unlimited token approvals, and unexpected transfers across Ethereum, Solana, and Push Chain.

## 🌟 Key Features

- **Universal Wallet Protection**: Works with any wallet across multiple chains
- **Real-time Threat Detection**: Monitors for suspicious activities
- **Push Protocol Notifications**: Instant alerts via Push Protocol
- **Cross-chain Compatibility**: Native support for Ethereum, Solana, and Push Chain
- **No Chain Switching Required**: Seamless experience using Push Chain's shared-state architecture

## 🏗️ Architecture

PushGuard leverages Push Chain's unique shared-state architecture:

1. **Universal Execution Accounts (UEAs)**: Automatically created for external-chain users
2. **Chain-aware Detection**: Uses `UEAFactory` to identify user's origin chain
3. **Per-chain Protection**: Maintains separate guard status for each chain
4. **Push Notifications**: Integrates with Push Protocol for real-time alerts

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- A wallet (MetaMask, Phantom, etc.)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pushguard

# Install dependencies for smart contracts
cd contracts
npm install

# Install dependencies for frontend
cd ../frontend
npm install
```

### Running the Application

```bash
# Start the frontend development server
cd frontend
npm run dev
```

Visit `http://localhost:3000` to access the application.

## 🔁 Usage Flow

### 1. User Connects Wallet
- User opens the dApp and clicks "Connect Wallet"
- Chooses any supported wallet (MetaMask, Phantom, etc.)
- Push Chain automatically creates a Universal Execution Account (UEA) if needed

### 2. User Enables PushGuard
- User clicks "Enable PushGuard"
- Smart contract uses `UEAFactory` to detect the user's origin chain
- Protection is activated for that specific chain

### 3. Threat Detection
- Frontend monitors for suspicious activities (simulated in this demo)
- When detected, reports to the smart contract

### 4. Notification System
- Smart contract emits threat detection events
- Frontend listens for events and sends Push Protocol notifications
- User receives real-time alerts

### 5. User Management
- Users can enable/disable protection for each chain independently
- View history of detected threats

## 📁 Project Structure

```
pushguard/
├── contracts/           # Solidity smart contracts
│   ├── PushGuard.sol    # Main contract
│   ├── hardhat.config.js # Hardhat configuration
│   └── scripts/         # Deployment scripts
├── frontend/            # Next.js frontend application
│   ├── src/
│   │   ├── app/         # React components and pages
│   │   └── lib/         # Utility functions and contract addresses
│   └── public/          # Static assets
└── README.md
```

## 🛠️ Development

### Smart Contract Development

```bash
# Compile contracts
cd contracts
npx hardhat compile

# Deploy to Push Chain testnet
npx hardhat run scripts/deploy.js --network pushchain
```

### Frontend Development

```bash
# Start development server
cd frontend
npm run dev

# Build for production
npm run build
```

## 🧪 Testing

```bash
# Run smart contract tests
cd contracts
npx hardhat test
```

## 🎯 Push Chain Integration

PushGuard demonstrates proper integration with Push Chain's core features:

- **UEAFactory Pattern**: Correctly uses `getOriginForUEA` to identify user's origin chain
- **Universal Wallet Kit**: Implements `@pushchain/ui-kit` for seamless wallet connection
- **Cross-chain State Management**: Maintains per-chain protection status
- **Push Protocol Integration**: Sends notifications using `@pushprotocol/restapi`

## 📺 Demo Script

1. Connect Ethereum wallet
2. Enable PushGuard protection
3. Simulate a threat (high-value token approval)
4. Receive instant Push notification
5. Switch to Solana wallet
6. Enable protection for Solana
7. Simulate SPL token approval threat
8. Receive notification for Solana threat

## 📚 Documentation & Resources

- [Push Chain Documentation](https://pushchain.github.io/push-chain-website/)
- [Universal Counter Tutorial](https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/tutorials/basics/tutorial-universal-counter/)
- [Push Protocol Docs](https://docs.push.org/developers)
- [Push Chain UI Kit](https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/ui-kit/integrate-push-universal-wallet/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.