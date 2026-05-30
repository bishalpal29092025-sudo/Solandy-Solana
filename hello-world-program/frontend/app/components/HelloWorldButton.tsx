"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useState } from "react";

const PROGRAM_ID = "Your Program ID here"; // Replace with your deployed program ID

export const HelloWorldButton = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [txSignature, setTxSignature] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCall = async () => {
    if (!publicKey || !connection) return;

    setStatus("sending");
    setErrorMsg("");
    setTxSignature("");

    try {
      const programId = new PublicKey(PROGRAM_ID);

      const transaction = new Transaction().add(
        new TransactionInstruction({
          keys: [],
          programId,
        }),
      );

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
        <p className="text-lg font-semibold text-gray-900">
          Hello World Program
        </p>
        <p className="text-sm text-gray-500">
          Calls your deployed Rust program on Devnet which logs &quot;Hello,
          World!&quot;
        </p>
        <p className="text-xs font-mono text-gray-400 break-all">
          Program ID: {PROGRAM_ID}
        </p>
      </div>

      <button
        onClick={handleCall}
        disabled={status === "sending"}
        className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Calling..." : "Call Hello World!"}
      </button>

      {status === "success" && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
          <span>&#9989;</span> Program executed!{" "}
          <a
            href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            View logs on Explorer
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
