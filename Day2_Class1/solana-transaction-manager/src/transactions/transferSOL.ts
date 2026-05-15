import {
    PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
  Keypair
} from "@solana/web3.js";


import { getConnection } from "../config/connection";

export async function transferSOL(
  senderWallet: Keypair,
  receiverWallet: PublicKey
): Promise<string> {

  const transaction =
    new Transaction().add(

      SystemProgram.transfer({
        fromPubkey: senderWallet.publicKey,
        toPubkey: receiverWallet,
        lamports: Math.floor(
          0.01 * LAMPORTS_PER_SOL
        ),
      })

    );

  return await sendAndConfirmTransaction(
    getConnection,
    transaction,
    [senderWallet]
  );
}