import {
  Transaction
} from "@solana/web3.js";

import { connection }
from "../config/connection";

export async function simulateTransaction(
  transaction: Transaction
) {

  return await connection.simulateTransaction(
    transaction
  );
}