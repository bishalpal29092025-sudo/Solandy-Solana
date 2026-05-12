---
title: #module 1 (Get Balance Using @solana/web3.js)
Description: Fetching Solana Wallet Balance using Web3.js
---

# Fetching Solana Wallet Balance using Web3.js

This example demonstrates how to use the `@solana/web3.js` library to connect to the Solana blockchain and retrieve the balance of a wallet address.

The code connects to the **Solana Devnet** network, which is commonly used for testing and development purposes. Using the `Connection` class, we establish communication with the blockchain and fetch the wallet balance in **lamports**, the smallest unit of SOL.

In Solana:

- `1 SOL = 1,000,000,000 lamports`

The `PublicKey` class is used to validate and represent a Solana wallet address securely.

## Code Example

```ts
import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
  const connection = new Connection(clusterApiUrl('devnet'));
  const balance = await connection.getBalance(address);
  return balance;
}

const address = new PublicKey("Your_Public_key");

getBalanceUsingWeb3(address)
.then(balance => {
    console.log(`Balance: ${balance} lamports`);
}).catch(error => {
    console.error("Error fetching balance:", error);
});
```

## How the Code Works

### 1. Importing Required Modules

```ts
import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';
```

- `PublicKey` → Represents a Solana wallet address
- `Connection` → Connects to the Solana blockchain
- `clusterApiUrl()` → Provides the RPC URL for a specific Solana network

---

### 2. Creating a Connection

```ts
const connection = new Connection(clusterApiUrl('devnet'));
```

This creates a connection to the Solana Devnet network.

---

### 3. Fetching Wallet Balance

```ts
const balance = await connection.getBalance(address);
```

The `getBalance()` method retrieves the balance of the wallet address in lamports.

---

### 4. Displaying the Balance

```ts
console.log(`Balance: ${balance} lamports`);
```

Prints the wallet balance to the console.

## Example Output

```bash
Balance: 2000000000 lamports
```

This means the wallet contains:

```bash
2 SOL
```

## Use Cases

This functionality is commonly used in:

- Solana dApps
- Wallet integrations
- Blockchain explorers
- Web3 applications
- Crypto portfolio trackers
- Learning Solana development

-------------------------------------------------------------------


## How To Set Up TSC Solana Project 

1. npm init -y
2. npm install @solana/web3.js
3. npm install -D typescript ts-node @types/node
4. npx tsc --init
```bash
// Configure tsconfig.json
"{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}"
```
5. Create Source Folder
```bash
mkdir src
touch src/index.ts
```

