import {
  Connection,
  clusterApiUrl
} from "@solana/web3.js";

import { NETWORK }
from "../constants/network";

export const connection =
  new Connection(
    clusterApiUrl(NETWORK),
    "confirmed"
  );