import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";

const programId = new PublicKey("11111111111111111111111111111111");
const seeds = [Buffer.from("helloworld")];

const [pda, bump] = PublicKey.findProgramAddressSync(seeds, programId);

console.log("PDA:", pda.toBase58());
console.log("Bump:", bump);

const pda2 = PublicKey.createProgramAddressSync(
  [
    Buffer.from("helloworld"),
    Buffer.from([bump]),
  ],
  programId
);
console.log("PDA2:", pda2.toBase58());
console.log("PDA2 is valid:", PublicKey.isOnCurve(pda2));


