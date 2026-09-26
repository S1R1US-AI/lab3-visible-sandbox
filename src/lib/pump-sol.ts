/**
 * Official public receive rails for S1R1US.ai.
 * Only these two exist: BTC + ETH EVM USDC.
 * No SOL receive is published. P@MP.fun mint is BYO SOL on YOUR device.
 * Never imported by 7-B0T / desk-logic HIGH path.
 * Never a private key.
 */
export const S1R1US_PUBLISHED_RECEIVES = {
  btc: "33kmWvmf3nz3255dGmbHxigb9X6Szv6cJ8",
  ethEvmUsdc: "0x551163f5d4c0361155d16131459afa5c936a60ad",
} as const;

export const PUMP_FUTURE_ROADMAP_NOTE =
  "**NOTE:** (future feature) P@MP.fun is currently experimental. BTC profits rotated into Pump.fun meme projects will use BYO SOL on the admin device — this host never publishes a SOL receive. Official public receives: BTC 33kmWvmf3nz3255dGmbHxigb9X6Szv6cJ8 · ETH EVM USDC (F33D) 0x551163f5d4c0361155d16131459afa5c936a60ad. Future: system admin DEPLOY a full Pump.fun LAUNCH PLAN using the admin interface. Host never holds keys. Isolated from 7-B0T tape. Never sells the BTC stack.";
