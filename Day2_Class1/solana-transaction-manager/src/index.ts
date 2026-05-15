import {
  PublicKey
} from "@solana/web3.js";

import "dotenv/config";

import { loadWallet } from "./wallets/loadWallet";

import { getWalletBalance }
from "./services/balance.service";

import { getAccountInfo }
from "./services/account.service";

import { getTransactionHistory }
from "./services/transaction.service";

import { transferSOL }
from "./transactions/transferSOL";

import { logTitle }
from "./utils/logger";

async function main(): Promise<void> {

  logTitle("Loading Wallet");

  const senderWallet = loadWallet();

  const receiverWallet =
    new PublicKey(
      process.env.RECEIVER_WALLET_ADDRESS!
    );

  console.log(
    "Sender:",
    senderWallet.publicKey.toString()
  );

  console.log(
    "Receiver:",
    receiverWallet.toString()
  );

  logTitle("Checking Balances");

  const senderBalance =
    await getWalletBalance(
      senderWallet.publicKey
    );

  const receiverBalance =
    await getWalletBalance(
      receiverWallet
    );

  console.log(
    "Sender Balance:",
    senderBalance,
    "SOL"
  );

  console.log(
    "Receiver Balance:",
    receiverBalance,
    "SOL"
  );

  logTitle("Reading Account Info");

  const accountInfo =
    await getAccountInfo(
      senderWallet.publicKey
    );

  console.log(
    "Account Exists:",
    !!accountInfo
  );

  logTitle("Reading Transaction History");

  const transactions =
    await getTransactionHistory(
      senderWallet.publicKey
    );

  console.log(
    "Transaction Count:",
    transactions.length
  );

  logTitle("Sending SOL");

  const signature =
    await transferSOL(
      senderWallet,
      receiverWallet
    );

  console.log(
    "Transaction Signature:",
    signature
  );

  logTitle("Completed");
}

main().catch((error: Error) => {
  console.error(error.message);
});