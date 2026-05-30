````md
# Hello World Program (Solana)

A simple Solana smart contract written in Rust that logs **"Hello, World!"** when invoked on-chain.

This project demonstrates the basics of:

- Writing a Solana program in Rust
- Building a program using `cargo build-sbf`
- Deploying a Solana smart contract
- Calling an on-chain program from a frontend or client

---

## Project Structure

```text
hello-world-program/
├── src/
│   └── lib.rs                      # Program entrypoint and logic
├── target/
│   └── deploy/
│       └── hello_world_program.so # Compiled Solana program binary
├── Cargo.toml                     # Rust dependencies and config
├── Cargo.lock
└── README.md
```

---

## Prerequisites

Make sure the following tools are installed:

- Rust
- Solana CLI
- Cargo Build SBF

Check installation:

```bash
rustc --version
cargo --version
solana --version
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd hello-world-program
```

Install dependencies:

```bash
cargo build
```

---

## Build the Program

Compile the Solana program:

```bash
cargo build-sbf
```

After successful build, the compiled binary will be generated at:

```text
target/deploy/hello_world_program.so
```

---

## Program Logic

The program logs:

```text
Hello, World!
```

Example logic:

```rust
msg!("Hello, World!");
```

---

## Deploy Program

Deploy the program to Solana Devnet:

```bash
solana program deploy target/deploy/hello_world_program.so
```

After deployment, you will receive a **Program ID**.

Example:

```text
Program Id: xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Tech Stack

- Rust
- Solana Program SDK
- Solana CLI

---

## License

This project is open-source and available under the MIT License.
````
