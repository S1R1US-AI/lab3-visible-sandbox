import { driftLocks } from "./drift-lock.ts";

export type Stance = "HOLD" | "ACCUMULATE" | "BUY" | "WAIT";
export type GapRegime = "cheap" | "mixed" | "closed";
export type GapState = "cheap" | "fair" | "rich";
