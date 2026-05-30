"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const BalanceDisplay = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) return;

    let id: number;

    const fetchBalance = async () => {
      try {
        const accountInfo = await connection.getAccountInfo(publicKey);
        setBalance(accountInfo ? accountInfo.lamports / LAMPORTS_PER_SOL : 0);
      } catch (error) {
        console.error("Error fetching balance: ", error);
      }
    };

    fetchBalance();

    try {
      id = connection.onAccountChange(publicKey, (updatedInfo) => {
        setBalance(
          updatedInfo ? updatedInfo.lamports / LAMPORTS_PER_SOL : 0
        );
      });
    } catch (error) {
      console.error("Error setting up account change listener: ", error);
    }

    return () => {
      if (id !== undefined) {
        connection.removeAccountChangeListener(id);
      }
    };
  }, [connection, publicKey]);

  if (!publicKey) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500 mb-1">Wallet Balance</p>
      <p className="text-3xl font-semibold text-gray-900">
        {balance !== null ? `${balance.toFixed(2)} SOL` : "Loading..."}
      </p>
      <p className="text-xs text-gray-400 mt-2 font-mono break-all">
        {publicKey.toBase58()}
      </p>
    </div>
  );
};

export default BalanceDisplay;