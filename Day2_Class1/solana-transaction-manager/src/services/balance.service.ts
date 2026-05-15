import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

import { getConnection } from "../config/connection";

export async function getWalletBalance(publicKey: PublicKey): Promise<number> {
  const connection = getConnection;
  const balance = await connection.getBalance(publicKey);
  return balance / LAMPORTS_PER_SOL;
}
