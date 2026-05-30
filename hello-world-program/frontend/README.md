# Hello World Program - Frontend

A Next.js frontend that connects to a deployed Solana Rust program on Devnet and calls it via Phantom wallet.

## What It Does

- Connects to Phantom wallet via Solana Wallet Adapter
- Calls a deployed Rust program on Solana Devnet
- Displays transaction result with a link to Solana Explorer
- Shows "Hello, World!" log in the transaction on-chain

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Solana Wallet Adapter
- @solana/web3.js

## Project Structure

```text hello-world-frontend/ ├── app/ │ ├── components/ │ │ ├── WalletProvider.tsx # Wraps app with Solana context providers │ │ ├── WalletButton.tsx # Dynamic wallet connect button (SSR safe) │ │ └── HelloWorldButton.tsx # Calls the on-chain Rust program │ ├── layout.tsx # Root layout with wallet provider │ ├── page.tsx # Main page UI │ └── globals.css ├── public/ ├── package.json └── README.md

```

## Program Details

| Item | Value |
|------|-------|
| Program ID | `71br9T1xfr7N8tnscECBCxUrGwWh8Cnah2djwQ6AbFGH` |
| Network | Devnet |
| Language | Rust |

## Getting Started

### Prerequisites

- Node.js 18+
- Phantom wallet browser extension
- Phantom set to Devnet mode

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## How to Use

1. Open the app at `http://localhost:3000`
2. Click **Select Wallet** and connect your Phantom wallet
3. Make sure Phantom is set to **Devnet**
4. Click **Call Hello World!**
5. Approve the transaction in Phantom
6. Click **View logs on Explorer** to see `"Hello, World!"` logged on-chain

## Related

- [Hello World Program (Rust)](../hello-world-program) — the on-chain program this frontend calls
- [Solana Explorer](https://explorer.solana.com/?cluster=devnet) — view transactions on Devnet