import { driftLocks } from "./drift-lock.ts";
export type Stance = "HOLD" | "ACCUMULATE" | "BUY" | "WAIT";
export type GapRegime = "cheap" | "mixed" | "closed";
export type GapState = "cheap" | "fair" | "rich";

export { agentResearchAllowed, botMayIngestResearch, nnMayIngest, runResearchSecurityScan } from "./research-security.ts";
