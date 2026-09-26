/** Frozen mandate. VERIFY may not weaken these. */

export const MANDATE_LOCK = {
  neverSell: true,
  neverShort: true,
  overlayNeverVotesHigh: true,
  coordinatorNeverVotesHigh: true,
  clipNeedsHighAnd7And16: true,
  highIsRotationAndSector: true,
  pumpIsolated: true,
  coinbaseCreateLocked: true,
  hostNeverEscrows: true,
  noKeysOnHost: true,
  paperOnly: true,
  githubNotWrittenFromSandbox: true,
} as const;

export const REQUIRED_CHECKPOINT_PHRASES = [
  "never sell",
  "overlay never votes HIGH",
  "CLIP",
  "HIGH",
  "Coordinator",
  "Coinbase create LOCKED",
  "P@MP",
  "GitHub",
] as const;

export const FORBIDDEN_LOGIC_PHRASES = [
  "overlay HIGH",
  "overlay votes HIGH",
  "Rotation open if live ETH ADD",
  "Sector open if live GOLD ADD",
  "day-trade bitcoin",
  "sell the stack",
] as const;
