import {
  Keypair,
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  TransactionInstruction,
} from "@solana/web3.js";
import "dotenv/config";

function initializeKeypairFromEnv(): Keypair {
  const ownerSecretKey = Uint8Array.from(
    JSON.parse(process.env.OWNER_SECRET_KEY!),
  );
  return Keypair.fromSecretKey(ownerSecretKey);
}

async function pingProgram(
  connection: Connection,
  ownerKeypair: Keypair,
): Promise<string> {
  const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
  const PING_PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

  const programId = new PublicKey(PING_PROGRAM_ADDRESS);
  const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: pingProgramDataId,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
    // No data needed for the ping program
  });

  const transaction = new Transaction().add(instruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    ownerKeypair,
  ]);

  return signature;
}

async function transferSOL(
  connection: Connection,
  ownerKeypair: Keypair,
  receiverWalletAddress: PublicKey,
  amountInSOL: number,
): Promise<string> {
  const lamports = Math.round(amountInSOL * LAMPORTS_PER_SOL);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: ownerKeypair.publicKey,
      toPubkey: receiverWalletAddress,
      lamports,
    }),
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    ownerKeypair,
  ]);

  return signature;
}

async function main() {
  const ownerKeypair = initializeKeypairFromEnv();
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const receiverWalletAddress = new PublicKey(
    process.env.RECEIVER_WALLET_ADDRESS!,
  );

  // --- Balances Before ---
  const ownerBalanceBefore = await connection.getBalance(ownerKeypair.publicKey);
  const receiverBalanceBefore = await connection.getBalance(receiverWalletAddress);
  console.log(`Owner Balance Before:    ${ownerBalanceBefore / LAMPORTS_PER_SOL} SOL`);
  console.log(`Receiver Balance Before: ${receiverBalanceBefore / LAMPORTS_PER_SOL} SOL`);

  // --- Ping the Program ---
  console.log("\nPinging the program...");
  const pingSignature = await pingProgram(connection, ownerKeypair);
  console.log(`Ping tx: https://explorer.solana.com/tx/${pingSignature}?cluster=devnet`);

  // --- Transfer SOL ---
  console.log("\nTransferring 0.001 SOL...");
  const transferSignature = await transferSOL(
    connection,
    ownerKeypair,
    receiverWalletAddress,
    0.001,
  );
  console.log(`Transfer tx: https://explorer.solana.com/tx/${transferSignature}?cluster=devnet`);

  // --- Balances After ---
  const ownerBalanceAfter = await connection.getBalance(ownerKeypair.publicKey);
  const receiverBalanceAfter = await connection.getBalance(receiverWalletAddress);
  console.log(`\nOwner Balance After:    ${ownerBalanceAfter / LAMPORTS_PER_SOL} SOL`);
  console.log(`Receiver Balance After: ${receiverBalanceAfter / LAMPORTS_PER_SOL} SOL`);
}

main().catch((error) => {
  console.error("Error occurred:", error);
});