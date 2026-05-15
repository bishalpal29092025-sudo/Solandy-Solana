import {
  PublicKey
} from "@solana/web3.js";

export interface WalletBalance {
  publicKey: PublicKey;
  balance: number;
}

export interface TransactionResult {
  signature: string;
  explorerUrl: string;
}

export interface SimulationResult {
  success: boolean;
  error: unknown;
}