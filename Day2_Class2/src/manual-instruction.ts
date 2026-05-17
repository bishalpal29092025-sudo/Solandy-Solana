import {
  Keypair, Connection, PublicKey, clusterApiUrl,
  Transaction, SystemProgram, LAMPORTS_PER_SOL,
  sendAndConfirmTransaction, TransactionInstruction,
} from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const ownerKeypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.OWNER_SECRET_KEY!))
);
const ownerPublicKey = ownerKeypair.publicKey;
const receiverWalletAddress = new PublicKey(process.env.RECEIVER_WALLET_ADDRESS!);

async function main() {
  const ownerBalanceBefore = await connection.getBalance(ownerPublicKey);
  const receiverBalanceBefore = await connection.getBalance(receiverWalletAddress);
  console.log(`Owner Balance Before: ${ownerBalanceBefore / 1e9} SOL`);
  console.log(`Receiver Balance Before: ${receiverBalanceBefore / 1e9} SOL`);

  const lamports = BigInt(Math.round(0.001 * LAMPORTS_PER_SOL)); // ✅ BigInt

  const instructionData = Buffer.alloc(4 + 8);
  instructionData.writeUInt32LE(2, 0);
  instructionData.writeBigUInt64LE(lamports, 4); // ✅ no type error

  const manualInstruction = new TransactionInstruction({
    keys: [
      { pubkey: ownerPublicKey, isSigner: true, isWritable: true },
      { pubkey: receiverWalletAddress, isSigner: false, isWritable: true },
    ],
    programId: SystemProgram.programId,
    data: instructionData,
  });

  const transaction = new Transaction().add(manualInstruction);
  const signature = await sendAndConfirmTransaction(connection, transaction, [ownerKeypair]);
  console.log("Transaction Signature:", signature);

  const ownerBalanceAfter = await connection.getBalance(ownerPublicKey);
  const receiverBalanceAfter = await connection.getBalance(receiverWalletAddress);
  console.log(`Owner Balance After: ${ownerBalanceAfter / 1e9} SOL`);
  console.log(`Receiver Balance After: ${receiverBalanceAfter / 1e9} SOL`);
}

main().catch(console.error);