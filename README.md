# NFT Marketplace

A modern, full-stack NFT marketplace built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Hardhat. Buy, sell, and discover unique digital assets on Ethereum. This project demonstrates best practices in decentralized app (dApp) development, smart contract engineering, and modern frontend design.

## Features

- ⚡ **Next.js 15 App Router**: Fast, scalable, and SEO-friendly React app.
- 🎨 **Tailwind CSS**: Custom, responsive, and dark-mode enabled UI.
- 🖼️ **NFT Minting & Listing**: Create, list, and resell NFTs with image upload and metadata.
- 🛒 **Marketplace**: Browse, buy, and sell NFTs with real-time updates.
- 👤 **Creator Dashboard**: View your created and listed NFTs.
- 🔒 **Smart Contracts**: Secure, upgradeable contracts using Hardhat and OpenZeppelin.
- 🧪 **Testing**: Comprehensive smart contract tests with Hardhat and Chai.
- 🌗 **Theming**: Light/dark mode with persistent user preference.
- 🔗 **Wallet Integration**: (Pluggable, see code for extension points).

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, next-themes
- **Smart Contracts**: Solidity, Hardhat, OpenZeppelin
- **Testing**: Hardhat, Chai, Mocha
- **UI Components**: Custom React components, Headless UI, Next.js Image
- **Other**: ESLint (flat config), PostCSS, Hardhat Ignition

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+)
- [Hardhat](https://hardhat.org/)
- (Optional) Metamask or compatible Ethereum wallet

### Installation

```bash
git clone https://github.com/OmarMWarraich/next15-nft-marketplace.git
cd next15-nft-marketplace
npm install
```

### Running the App

#### 1. Start the Hardhat Local Node

```bash
npx hardhat node
```

#### 2. Deploy Smart Contracts

```bash
npx hardhat ignition deploy ./ignition/modules/NFTMarketplace.ts
```

#### 3. Run the Next.js App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Running Tests

```bash
npx hardhat test
```

## Project Structure

```
app/                # Next.js app directory (pages, layouts, routes)
components/         # Reusable React components (UI, Navbar, Footer, NFTCard, etc.)
contracts/          # Solidity smart contracts (NFTMarketplace.sol)
context/            # React context and constants
lib/                # Utility functions
public/assets/      # Static images and assets
test/               # Hardhat/Chai test files
config/             # App and contract config
```

## Key Files

- `contracts/NFTMarketplace.sol`: Main NFT marketplace smart contract.
- `app/create-nft/page.tsx`: NFT creation UI.
- `app/created-nfts/page.tsx`: Creator dashboard for listed NFTs.
- `app/nft-details/page.tsx`: NFT details and purchase/resell.
- `test/Lock.ts`: Example Hardhat test.
- `tailwind.config.ts`: Custom Tailwind theme.
- `hardhat.config.ts`: Hardhat project config.

## Customization

- **Theming**: Edit `tailwind.config.ts` and `ThemeProvider` in `app/layout.tsx`.
- **Smart Contracts**: Extend `NFTMarketplace.sol` for royalties, auctions, etc.
- **Wallet Integration**: Add wallet connection logic in `components/Account.tsx` or similar.

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## License

MIT

---

If you have questions or want to contribute, please open an issue or PR!
