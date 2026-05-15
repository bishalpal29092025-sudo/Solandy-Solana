export function getExplorerLink(
  signature: string
): string {

  return `
https://explorer.solana.com/tx/${signature}?cluster=devnet
`;
}