"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useState } from "react";

const PROGRAM_ID = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const DATA_ACCOUNT = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

export const PingButton = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [status, setStatus] = useState<"idle" | "pinging" | "success" | "error">("idle");
  const [txSignature, setTxSignature] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePing = async () => {
    if (!publicKey || !connection) return;

    setStatus("pinging");
    setErrorMsg("");
    setTxSignature("");

    try {
      const programId = new PublicKey(PROGRAM_ID);
      const dataAccount = new PublicKey(DATA_ACCOUNT);

      const transaction = new Transaction();

      const instruction = new TransactionInstruction({
        keys: [
          {
            pubkey: dataAccount,
            isSigner: false,
            isWritable: true,
          },
        ],
        programId,
      });

      transaction.add(instruction);

      const signature = await sendTransaction(transaction, connection);
      setTxSignature(signature);
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Transaction failed");
      setStatus("error");
    }
  };

  if (!publicKey) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-900">Ping the Program</p>
        <p className="text-sm text-gray-500">
          Sends a transaction to increment the on-chain counter.
        </p>
      </div>

      <button
        onClick={handlePing}
        disabled={status === "pinging"}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "pinging" ? "Pinging..." : "Ping!"}
      </button>

      {status === "success" && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
          <span>&#9989;</span> Pinged successfully!{" "}
          <a
            href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            View on Explorer
          </a>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          <span>&#10060;</span> {errorMsg}
        </div>
      )}
    </div>
  );
};