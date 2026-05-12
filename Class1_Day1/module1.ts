import { PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
  const connection = new Connection(clusterApiUrl('devnet'));
  const balance = await connection.getBalance(address);
  return balance;
}

const address = new PublicKey("Bish4jTY4RwW88W4QAKPcmhV9sXifGDKEBpDpQfUGTjx");
getBalanceUsingWeb3(address)
.then(balance => {
    console.log(`Balance: ${balance} lamports`);
    console.log(`Balance: ${balance / 1e9} SOL`); // Convert lamports to SOL , 1 SOL = 1,000,000,000 lamports
    console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`); // Another way to convert lamports to SOL using the constant.
}).catch(error => {
    console.error("Error fetching balance:", error);
});

