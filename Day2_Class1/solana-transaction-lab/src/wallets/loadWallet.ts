import {
  Keypair
} from "@solana/web3.js";

import "dotenv/config";

export function loadWallet(): Keypair {

  const secretKey =
    process.env.SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "SECRET_KEY missing"
    );
  }

  return Keypair.fromSecretKey(
    Uint8Array.from(
      JSON.parse(secretKey)
    )
  );
}