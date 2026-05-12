import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();
const publicKey = keypair.publicKey.toBase58();
const secretKey = keypair.secretKey;
const secretKeyString = JSON.stringify(Array.from(secretKey));

// Add This thing In your .env file
console.log(`PUBLIC_KEY=${publicKey}`);
console.log(`SECRET_KEY=${secretKeyString}`);
