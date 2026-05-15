import { Connection, clusterApiUrl } from "@solana/web3.js";

export const getConnection = new Connection(
  clusterApiUrl("devnet"),
  "confirmed",
);






/* Explanation

This module:

creates connection to the Solana devnet
sets commitment level to "confirmed"

VERY important separation.

This file handles:

ALL blockchain connection logic

Why?

Because later:

many services
many transactions
many modules

will need blockchain access.
*/  
