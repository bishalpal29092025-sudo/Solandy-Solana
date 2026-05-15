import { Keypair } from "@solana/web3.js";
import "dotenv/config";

export function loadWallet(): Keypair {
    const secretKey = process.env.SECRET_KEY;
    if(!secretKey){
        throw new Error("SECRET_KEY is not defined in the environment variables");
    }

    const secretKeyArray = Uint8Array.from(
        JSON.parse(secretKey)
    );

    return Keypair.fromSecretKey(
        secretKeyArray
    )
}


/* Explanation

This module:

reads private key
validates it
converts it
creates wallet

VERY important separation.
*/