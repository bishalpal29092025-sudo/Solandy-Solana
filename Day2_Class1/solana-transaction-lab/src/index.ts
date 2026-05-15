import {
  PublicKey
} from "@solana/web3.js";

import "dotenv/config";

import { loadWallet }
from "./wallets/loadWallet";

import { getBalance }
from "./services/balance.service";

import { createTransferTransaction }
from "./transactions/transferSOL";

import { createMemoInstruction }
from "./transactions/memoTransaction";

import { sendTransaction }
from "./services/transaction.service";

import { simulateTransaction }
from "./services/simulation.service";

import { getExplorerLink }
from "./services/explorer.service";

import { logSection }
from "./utils/logger";

import { formatSOL }
from "./utils/formatter";

async function main(): Promise<void> {

  const sender =
    loadWallet();

  const receiver =
    new PublicKey(
      process.env.RECEIVER_WALLET_ADDRESS!
    );

  logSection("Balances Before");

  const senderBalance =
    await getBalance(
      sender.publicKey
    );

  console.log(
    "Sender:",
    formatSOL(senderBalance),
    "SOL"
  );

  const transaction = await createTransferTransaction(sender, receiver);

  transaction.add(
    createMemoInstruction(
      "Solana Transaction Lab"
    )
  );

  logSection("Simulating Transaction");

  const simulation =
    await simulateTransaction(
      transaction
    );

  console.log(
    simulation.value.err
      ? simulation.value.err
      : "Simulation Successful"
  );

  logSection("Sending Transaction");

  const signature =
    await sendTransaction(
      transaction,
      sender
    );

  console.log(
    "Signature:",
    signature
  );

  console.log(
    "Explorer:",
    getExplorerLink(signature)
  );

  logSection("Balances After");

  const updatedBalance =
    await getBalance(
      sender.publicKey
    );

  console.log(
    "Updated Sender Balance:",
    formatSOL(updatedBalance),
    "SOL"
  );
}

main().catch(console.error);