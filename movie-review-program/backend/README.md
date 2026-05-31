# Movie Review Program - Solana Rust Program

A native Solana program written in Rust that allows users to submit movie reviews on-chain.
Each review is stored in a dedicated PDA account derived from the user's public key and movie title.

## What It Does

- Accepts a movie title, rating (1-5), and description as instruction data
- Derives a unique PDA for each user + movie title combination
- Creates a new on-chain account at that PDA address
- Serializes and stores the review data into the account using Borsh

## Tech Stack

- Rust 1.95.0
- solana-program 2.1.0
- borsh 1.5.0
- Solana CLI 3.1.12

## Project Structure
```text backend/ ├── src/ │ ├── lib.rs # Entrypoint, process_instruction, add_movie_review │ ├── instruction.rs # Deserialize incoming instruction data │ └── state.rs # MovieAccountState struct definition ├── target/ │ └── deploy/ │ └── movie_review_program.so ├── Cargo.toml # Rust dependencies and configuration ├── Cargo.lock # Dependency lock file └── README.md ```

## Program Details

| Item | Value |
|------|-------|
| Program ID | `Dz3z63y9ZXidCLAaM8JsBfNE5WTdipp2fCKmfobjMaHr` |
| Network | Devnet |
| Deployed By | `A3BCAFsXus3fdjw83aaBn9795jGiGgez9FyKxojowv62` |

## Key Concepts Used

| Concept | Where |
|---------|-------|
| Borsh Serialization | `state.rs` — serialize/deserialize account data |
| PDA Derivation | `lib.rs` — `find_program_address` with user pubkey + title |
| CPI | `lib.rs` — `invoke_signed` to call System Program |
| Account Iterator | `lib.rs` — `next_account_info` to extract accounts |
| Rent Calculation | `lib.rs` — `Rent::get()` and `minimum_balance()` |

## Account Data Structure

```rust
pub struct MovieAccountState {
    pub is_initialized: bool,  // 1 byte
    pub rating: u8,            // 1 byte
    pub title: String,         // 4 bytes + length
    pub description: String,   // 4 bytes + length
}
```

## Instruction Data Structure
```text [ variant (1 byte) ][ title ][ rating ][ description ] ```

## Prerequisites

- Rust 1.95.0+
- Solana CLI 3.1.12+
- Keypair configured and pointed to Devnet

## Setup

### Configure Solana for Devnet

```bash
solana config set --url devnet
solana config set --keypair ~/.config/solana/id.json
```

### Get Devnet SOL

```bash
solana airdrop 2
```

## Build

```bash
cargo build-sbf
```

Compiled binary will be at `target/deploy/movie_review_program.so`

## Deploy

```bash
solana program deploy target/deploy/movie_review_program.so
```

## Related

- [Movie Review Frontend](../frontend) — Next.js app that calls this program
- [Solana Explorer](https://explorer.solana.com/address/Dz3z63y9ZXidCLAaM8JsBfNE5WTdipp2fCKmfobjMaHr?cluster=devnet)