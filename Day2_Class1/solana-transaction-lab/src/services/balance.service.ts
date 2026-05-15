import {
  PublicKey
} from "@solana/web3.js";

import { connection }
from "../config/connection";

export async function getBalance(
  publicKey: PublicKey
): Promise<number> {

  return await connection.getBalance(
    publicKey
  );
}