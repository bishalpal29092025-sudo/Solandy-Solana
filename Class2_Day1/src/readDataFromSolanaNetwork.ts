
import {
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';

async function getBalance(walltetAddress: string) {
    // Connect to Solana Devnet
    const connection = new Connection(clusterApiUrl('devnet'));

    // Create PublicKey object
    const publicKey = new PublicKey(walltetAddress);

    // Fetch balance
    const balance = await connection.getBalance(publicKey);
    // Convert lamports to SOL
    console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
}
// Example wallet address
const walletAddress =
  "Bish4jTY4RwW88W4QAKPcmhV9sXifGDKEBpDpQfUGTjx";

getBalance(walletAddress);
