"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "./components/WalletButton";
import { MovieReviewForm } from "./components/MovieReviewForm";

export default function Home() {
  const { publicKey } = useWallet();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-xl space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Movie Review
          </h1>
          <p className="text-sm text-gray-500">
            Submit your movie reviews on Solana Devnet
          </p>
          <p className="text-xs font-mono text-gray-400">
            Program: Dz3z63y9ZXidCLAaM8JsBfNE5WTdipp2fCKmfobjMaHr
          </p>
        </div>

        {/* Connect Button */}
        <div className="flex justify-center">
          <WalletButton />
        </div>

        {/* Show when connected */}
        {publicKey ? (
          <div className="space-y-4">
            <MovieReviewForm />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-400">
            Connect your wallet to submit a movie review
          </div>
        )}

      </div>
    </main>
  );
}