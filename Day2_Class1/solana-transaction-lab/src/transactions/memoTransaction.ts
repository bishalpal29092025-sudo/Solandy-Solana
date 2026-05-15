import {
  TransactionInstruction,
  PublicKey
} from "@solana/web3.js";

const MEMO_PROGRAM_ID =
  new PublicKey(
    "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
  );

export function createMemoInstruction(
  memo: string
): TransactionInstruction {

  return new TransactionInstruction({
    keys: [],
    programId: MEMO_PROGRAM_ID,
    data: Buffer.from(memo),
  });
}