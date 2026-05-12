import "dotenv/config";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";

// Connect to the Devnet Cluster 
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const secretKey = Uint8Array.from(JSON.parse(process.env.SECRET_KEY!));
const wallet = Keypair.fromSecretKey(secretKey);
async function main() {
    console.log("\nConnected to Solana Devnet");
    const balance = await connection.getBalance(wallet.publicKey);
    console.log(`Wallet Public Key: ${wallet.publicKey.toBase58()}`);
    console.log(`Wallet Balance: ${balance / 1e9} SOL`);

    const transactionHistory = await connection.getSignaturesForAddress(wallet.publicKey);
    console.log(`Transaction History: ${JSON.stringify(transactionHistory)}`);
}
main().catch((error) => {
    console.error("Error:", error);
});