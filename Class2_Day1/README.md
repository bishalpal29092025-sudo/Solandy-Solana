# Chapter 2: Generating a Vanity Solana Keypair

In this chapter, we will generate a custom Solana wallet address using the `solana-keygen grind` command.  
A vanity address allows you to create a wallet address that starts with a specific prefix, making it easier to recognize.

---

## Generate the Keypair

Run the following command in your terminal:

```bash
solana-keygen grind --starts-with Bish:1
```

--------

# Configuring the Solana CLI Keypair

After generating the wallet keypair, the next step is to configure the Solana CLI to use that keypair as the default wallet.

---

## Set the Default Keypair

Run the following command:

```bash
solana config set -k ./Bish............_.json
```

---

## Explanation

- `solana config set` → Updates the Solana CLI configuration.
- `-k` or `--keypair` → Specifies the keypair file to use.
- `./Bish............_.json` → Path to the generated wallet keypair file.

This command tells Solana CLI to use the selected wallet for all future transactions and commands.

---

## Output

After running the command, you should see output similar to this:

```bash
Config File: /Users/bishalpal/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: ./Bish............_.json
Commitment: confirmed
```

---

## Understanding the Configuration

### Config File
```bash
/Users/bishalpal/.config/solana/cli/config.yml
```

This file stores the Solana CLI configuration settings.

---

### RPC URL
```bash
https://api.devnet.solana.com
```

The CLI is currently connected to the **Solana Devnet**, which is mainly used for testing and development.

---

### Keypair Path
```bash
./Bish............_.json
```

This is the wallet file that Solana CLI will use by default.

---

## Verify the Active Wallet

You can verify the currently configured wallet address using:

```bash
solana address
```

Example output:

```bash
Bish................
```

---

## Summary

In this section, we:

- Configured the Solana CLI to use a custom keypair
- Connected the CLI to Solana Devnet
- Verified the active wallet address
- Learned how Solana stores CLI configuration settings
------------


