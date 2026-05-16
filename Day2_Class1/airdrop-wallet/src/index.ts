import {
  Connection,
  Keypair,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import "dotenv/config";

// --------------------------------------
// Create Connection
// --------------------------------------

const connection = new Connection(
  clusterApiUrl("devnet"),
  "confirmed"
);

// --------------------------------------
// Load Wallet from .env
// --------------------------------------

const secretKey = Uint8Array.from(
  JSON.parse(process.env.SECRET_KEY!)
);

const wallet = Keypair.fromSecretKey(
  secretKey
);

// --------------------------------------
// Main Function
// --------------------------------------

async function main() {

  console.log("\n========== WALLET INFO ==========");

  console.log(
    "Wallet Address:",
    wallet.publicKey.toBase58()
  );

  // --------------------------------------
  // Check Initial Balance
  // --------------------------------------

  const initialBalance =
    await connection.getBalance(
      wallet.publicKey
    );

  console.log(
    "\nInitial Balance:",
    initialBalance / LAMPORTS_PER_SOL,
    "SOL"
  );

  // --------------------------------------
  // Request Airdrop
  // --------------------------------------

  console.log(
    "\nRequesting Airdrop..."
  );

  const signature =
    await connection.requestAirdrop(
      wallet.publicKey,
      0.01 * LAMPORTS_PER_SOL
    );

  // --------------------------------------
  // Confirm Transaction
  // --------------------------------------

  const latestBlockhash =
    await connection.getLatestBlockhash();

  await connection.confirmTransaction({
    signature,
    ...latestBlockhash,
  });

  // --------------------------------------
  // Explorer Link
  // --------------------------------------

  console.log(
    "\nTransaction Signature:"
  );

  console.log(signature);

  console.log(
    "\nExplorer URL:"
  );

  console.log(
    `https://explorer.solana.com/tx/${signature}?cluster=devnet`
  );

  // --------------------------------------
  // Updated Balance
  // --------------------------------------

  const updatedBalance =
    await connection.getBalance(
      wallet.publicKey
    );

  console.log(
    "\nUpdated Balance:",
    updatedBalance / LAMPORTS_PER_SOL,
    "SOL"
  );

  console.log(
    "\nAirdrop Completed Successfully"
  );
}

// --------------------------------------
// Execute Program
// --------------------------------------

main().catch(console.error);