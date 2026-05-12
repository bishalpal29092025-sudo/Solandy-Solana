import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";


// Connect to the Devnet Cluster 
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");


// Receiver Wallet Address
const receiverWalletAddress = new PublicKey(process.env.RECEIVER_WALLET_ADDRESS!);

// Sender Wallet From .env SECRET_KEY
const secretKey = Uint8Array.from(JSON.parse(process.env.SECRET_KEY!));
const senderWallet = Keypair.fromSecretKey(secretKey);

// Main Function 
async function main(){
    console.log("\nConnected to Solana Devnet");
    // Wallet Balances Before Transaction
    const senderBalanceBefore = await connection.getBalance(senderWallet.publicKey);
    const receiverBalanceBefore = await connection.getBalance(receiverWalletAddress);
    console.log(`Sender Balance Before: ${senderBalanceBefore / LAMPORTS_PER_SOL} SOL`);
    console.log(`Receiver Balance Before: ${receiverBalanceBefore / LAMPORTS_PER_SOL} SOL`);

    // Account Information 
    const senderAccountInfo = await connection.getAccountInfo(senderWallet.publicKey);
    const receiverAccountInfo = await connection.getAccountInfo(receiverWalletAddress);
    console.log(`Sender Account Info: ${senderAccountInfo ? "Exists" : "Does Not Exist"}`);
    console.log(`Receiver Account Info: ${receiverAccountInfo ? "Exists" : "Does Not Exist"}`);

    // Latest Blockhash
    const latestBlockhash = await connection.getLatestBlockhash();
    console.log(`Latest Blockhash: ${latestBlockhash.blockhash}`);

    // Transaction History 
    const senderTransactions = await connection.getSignaturesForAddress(senderWallet.publicKey);
    const receiverTransactions = await connection.getSignaturesForAddress(receiverWalletAddress);
    console.log(`Sender Transaction Length: ${senderTransactions.length} transactions`);
    console.log(`Sender Transaction History: ${senderTransactions}`);
    console.log(`Receiver Transaction Length: ${receiverTransactions.length} transactions`);
    console.log(`Receiver Transaction History: ${receiverTransactions}`);

    // Create Transaction 
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: senderWallet.publicKey,
            toPubkey: receiverWalletAddress,
            lamports: 0.01 * LAMPORTS_PER_SOL, // Transfer 0.01 SOL
        })
    );

    // Sign and Send Transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [senderWallet]);
    console.log(`Transactions Successfully Sent!`);
    console.log(`Transaction Signature: ${signature}`);
    
    // Wallet Balances After Transaction
    const senderBalanceAfter = await connection.getBalance(senderWallet.publicKey);
    const receiverBalanceAfter = await connection.getBalance(receiverWalletAddress);
    console.log(`Sender Balance After: ${senderBalanceAfter / LAMPORTS_PER_SOL} SOL`);
    console.log(`Receiver Balance After: ${receiverBalanceAfter / LAMPORTS_PER_SOL} SOL`);

    // Update Receiver Account Info After Transaction
    const updatedReceiverAccountInfo = await connection.getAccountInfo(receiverWalletAddress);
    console.log(`Updated Receiver Balance: ${updatedReceiverAccountInfo ? updatedReceiverAccountInfo.lamports / LAMPORTS_PER_SOL : "N/A"} SOL`);
}

// Execute Program
main().catch((error) => {
    console.error("Error executing transaction:", error);
});