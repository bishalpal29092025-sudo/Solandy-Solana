"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "./components/WalletButton";
import BalanceDisplay from "./components/BalanceDisplay";
import { SendSol } from "./components/SendSol";

export default function Home() {
  const { publicKey } = useWallet();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-xl space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Solana dApp</h1>
          <p className="text-sm text-gray-500">
            Connect your Phantom wallet to view balance and send SOL on Devnet
          </p>
        </div>

        {/* Connect Button */}
        <div className="flex justify-center">
          <WalletButton />
        </div>

        {/* Show these only when wallet is connected */}
        {publicKey ? (
          <div className="space-y-4">
            <BalanceDisplay />
            <SendSol />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-400">
            Connect your wallet to get started
          </div>
        )}

      </div>
    </main>
  );
}