import {
  Keypair,
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const ownerSecretKey = Uint8Array.from(
  JSON.parse(process.env.OWNER_SECRET_KEY!),
);
const ownerKeypair = Keypair.fromSecretKey(ownerSecretKey);

const receiverWalletAddress = new PublicKey(
  process.env.RECEIVER_WALLET_ADDRESS!,
);
const ownerPublicKey = new PublicKey(ownerKeypair.publicKey);

// console.log("Owner Public Key:", ownerPublicKey.toBase58());
async function main() {
  const owenerBalanceBefore = await connection.getBalance(ownerPublicKey);
  const receiverBalanceBefore = await connection.getBalance(
    receiverWalletAddress,
  );
  console.log(`Owner Balance Before: ${owenerBalanceBefore / 1e9} SOL`);
  console.log(`Receiver Balance Before: ${receiverBalanceBefore / 1e9} SOL`);

  let transaction = new Transaction();
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: ownerPublicKey,
    toPubkey: receiverWalletAddress,
    lamports: 0.001 * LAMPORTS_PER_SOL, // 0.001 SOL
  });
  transaction.add(sendSolInstruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    ownerKeypair,
  ]);

  console.log("Transaction Signature:", signature);

  const owenerBalanceAfter = await connection.getBalance(ownerPublicKey);
  const receiverBalanceAfter = await connection.getBalance(
    receiverWalletAddress,
  );
  console.log(`Owner Balance After: ${owenerBalanceAfter / 1e9} SOL`);
  console.log(`Receiver Balance After: ${receiverBalanceAfter / 1e9} SOL`);
}

main().catch((error) => {
  console.error("Error occurred:", error);
});
