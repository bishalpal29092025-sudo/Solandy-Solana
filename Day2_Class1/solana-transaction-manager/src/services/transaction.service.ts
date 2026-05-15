import { PublicKey } from "@solana/web3.js";

import { getConnection } from "../config/connection";

export async function getTransactionHistory(publicKey: PublicKey) {
    return await getConnection.getSignaturesForAddress(publicKey);
}