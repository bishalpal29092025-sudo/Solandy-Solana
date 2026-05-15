import {
  LAMPORTS_PER_SOL
} from "@solana/web3.js";

export function formatSOL(
  lamports: number
): number {

  return lamports / LAMPORTS_PER_SOL;
}