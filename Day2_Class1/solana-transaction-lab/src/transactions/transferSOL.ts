import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";

import { connection }
from "../config/connection";

export async function createTransferTransaction(
  sender: Keypair,
  receiver: PublicKey
): Promise<Transaction> {

  // Create transaction
  const transaction =
    new Transaction().add(

      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: receiver,
        lamports: Math.floor(
          0.01 * LAMPORTS_PER_SOL
        ),
      })

    );

  // VERY IMPORTANT
  transaction.feePayer =
    sender.publicKey;

  // VERY IMPORTANT
  const latestBlockhash =
    await connection.getLatestBlockhash();

  transaction.recentBlockhash =
    latestBlockhash.blockhash;

  return transaction;
}