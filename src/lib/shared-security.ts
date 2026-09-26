/**
 * ONLY shared surface between S1R1US desk OS and P@MP.fun.
 * Trading tape, clips, HIGH, GitHub, and 7-B0T calls never cross this file.
 */
export const SHARED_SECURITY = {
  paperOnly: true,
  coinbaseCreateLocked: true,
  neverSellBtcStack: true,
  neverShort: true,
  hostNeverEscrows: true,
  noKeysOnHost: true,
  noHiveCustody: true,
} as const;

export const SECURITY_LINE =
  "SECURITY (both desks): paper only · Coinbase create LOCKED · never sell the BTC stack · never short · host never escrows · no keys vaulted.";
