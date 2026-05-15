import { PublicKey } from "@solana/web3.js";

import { getConnection } from "../config/connection";

export async function getAccountInfo(publicKey: PublicKey) {
  return await getConnection.getAccountInfo(publicKey);
}
