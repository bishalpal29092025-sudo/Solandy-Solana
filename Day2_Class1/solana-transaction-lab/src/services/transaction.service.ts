import {
  Keypair,
  Transaction,
  sendAndConfirmTransaction
} from "@solana/web3.js";

import { connection }
from "../config/connection";

export async function sendTransaction(
  transaction: Transaction,
  signer: Keypair
): Promise<string> {

  return await sendAndConfirmTransaction(
    connection,
    transaction,
    [signer]
  );
}