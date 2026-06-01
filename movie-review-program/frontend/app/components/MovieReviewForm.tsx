"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { useState } from "react";

const PROGRAM_ID = "Dz3z63y9ZXidCLAaM8JsBfNE5WTdipp2fCKmfobjMaHr";

// Manual Borsh serialization — compatible with all borsh versions
function serializeMovieReview(
  variant: number,
  title: string,
  rating: number,
  description: string
): Buffer {
  const titleBytes = Buffer.from(title, "utf8");
  const descBytes = Buffer.from(description, "utf8");

  const buffer = Buffer.alloc(
    1 + // variant
    4 + titleBytes.length + // title length prefix + title
    1 + // rating
    4 + descBytes.length   // description length prefix + description
  );

  let offset = 0;

  // variant (1 byte)
  buffer.writeUInt8(variant, offset);
  offset += 1;

  // title length (4 bytes little-endian) + title bytes
  buffer.writeUInt32LE(titleBytes.length, offset);
  offset += 4;
  titleBytes.copy(buffer, offset);
  offset += titleBytes.length;

  // rating (1 byte)
  buffer.writeUInt8(rating, offset);
  offset += 1;

  // description length (4 bytes little-endian) + description bytes
  buffer.writeUInt32LE(descBytes.length, offset);
  offset += 4;
  descBytes.copy(buffer, offset);

  return buffer;
}

export const MovieReviewForm = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [txSignature, setTxSignature] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!publicKey || !connection) return;

    setStatus("sending");
    setErrorMsg("");
    setTxSignature("");

    try {
      const programId = new PublicKey(PROGRAM_ID);

      // Serialize instruction data manually
      const instructionData = serializeMovieReview(0, title, rating, description);

      // Derive PDA — same seeds as the Rust program
      const [pda] = PublicKey.findProgramAddressSync(
        [publicKey.toBuffer(), Buffer.from(title)],
        programId
      );

      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true },
          { pubkey: pda, isSigner: false, isWritable: true },
          {
            pubkey: new PublicKey("11111111111111111111111111111111"),
            isSigner: false,
            isWritable: false,
          },
        ],
        programId,
        data: instructionData,
      });

      const transaction = new Transaction().add(instruction);
      const signature = await sendTransaction(transaction, connection);

      setTxSignature(signature);
      setStatus("success");
      setTitle("");
      setRating(1);
      setDescription("");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Transaction failed");
      setStatus("error");
    }
  };

  if (!publicKey) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-900">Submit Movie Review</p>
        <p className="text-sm text-gray-500">
          Your review will be stored on Solana Devnet
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">
            Movie Title
          </label>
          <input
            type="text"
            placeholder="e.g. Inception"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">
            Rating: <span className="font-bold text-purple-600">{rating} / 5</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full accent-purple-600"
            title="Movie rating from 1 to 5"
            aria-label="Movie rating"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>1 - Poor</span>
            <span>3 - Good</span>
            <span>5 - Excellent</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">
            Your Review
          </label>
          <textarea
            placeholder="Write your review here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!title || !description || status === "sending"}
        className="w-full rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Submitting..." : "Submit Review"}
      </button>

      {status === "success" && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
          <span>&#9989;</span> Review submitted!{" "}
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