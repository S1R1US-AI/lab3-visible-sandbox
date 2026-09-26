/** Persist system-admin controls. Live polls must never write these keys. */
import { useEffect, useState } from "react";
import type { DeskState, GapRegime, GmMode, PredLean } from "./desk-logic";

export const ADMIN_SETTINGS_KEY = "s1r1us-admin-controls-v1";

export type AdminControls = {
  b7: boolean;
  bots16: boolean;
  gmMode: GmMode;
  g0On: boolean;
  b8: boolean;
  b9: boolean;
  pr3d: boolean;
  m3rc: boolean;
  b9Mode: "manual" | "auto";
  riskProfile: number;
  predLean: PredLean;
  gapRegime: GapRegime;
  discPick: DeskState["discPick"];
  v4c: boolean;
  pumpOn: boolean;
  pumpTriggerOpen: boolean;
  pumpNeedOpen: boolean;
  adminPreviewOpen: boolean;
  bot5Open: boolean;
  gradProjectId: string;
  gradQuoteOnPaper: boolean;
  gradFeedNn: boolean;
};

const FLAGS = [
  "b7",
  "bots16",
  "g0On",
  "b8",
  "b9",
  "pr3d",
  "m3rc",
  "v4c",
  "pumpOn",
  "pumpTriggerOpen",
  "pumpNeedOpen",
  "adminPreviewOpen",
  "bot5Open",
  "gradQuoteOnPaper",
  "gradFeedNn",
] as const;

function isBool(v: unknown): v is boolean {
  return v === true || v === false;
}

export function parseAdminControls(raw: unknown): Partial<AdminControls> {
  if (!raw || typeof raw !== "object") return {};
  const o = raw as Record<string, unknown>;
  const out: Partial<AdminControls> = {};
  for (const k of FLAGS) {
    if (isBool(o[k])) out[k] = o[k];
  }
  if (o.gmMode === "off" || o.gmMode === "auto" || o.gmMode === "manual") out.gmMode = o.gmMode;
  if (o.b9Mode === "manual" || o.b9Mode === "auto") out.b9Mode = o.b9Mode;
  if (o.predLean === "dump" || o.predLean === "mixed" || o.predLean === "accum") out.predLean = o.predLean;
  if (o.gapRegime === "cheap" || o.gapRegime === "mixed" || o.gapRegime === "closed") out.gapRegime = o.gapRegime;
  if (o.discPick === "select" || o.discPick === "cheap" || o.discPick === "mixed" || o.discPick === "closed") {
    out.discPick = o.discPick;
  }
  if (typeof o.riskProfile === "number" && Number.isFinite(o.riskProfile)) {
    out.riskProfile = Math.min(30, Math.max(1, Math.round(o.riskProfile)));
  }
  if (typeof o.gradProjectId === "string" && o.gradProjectId.length < 80) {
    out.gradProjectId = o.gradProjectId;
  }
  if (out.b8 !== undefined || out.m3rc !== undefined) {
    const on = Boolean(out.b8 ?? out.m3rc);
    out.b8 = on;
    out.m3rc = on;
  }
  return out;
}

export function readAdminControls(): Partial<AdminControls> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ADMIN_SETTINGS_KEY);
    if (!raw) return {};
    return parseAdminControls(JSON.parse(raw));
  } catch {
    return {};
  }
}

export function writeAdminControls(patch: Partial<AdminControls>) {
  if (typeof window === "undefined") return;
  const next = { ...readAdminControls(), ...patch };
  if (next.b8 !== undefined || next.m3rc !== undefined) {
    const on = Boolean(next.b8 ?? next.m3rc);
    next.b8 = on;
    next.m3rc = on;
  }
  window.localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(next));
}

export function deskPatchFromControls(c: Partial<AdminControls>): Partial<DeskState> {
  const p: Partial<DeskState> = {};
  if (c.b7 !== undefined) p.b7 = c.b7;
  if (c.bots16 !== undefined) p.bots16 = c.bots16;
  if (c.gmMode !== undefined) p.gmMode = c.gmMode;
  if (c.g0On !== undefined) p.g0On = c.g0On;
  if (c.b8 !== undefined) p.b8 = c.b8;
  if (c.b9 !== undefined) p.b9 = c.b9;
  if (c.pr3d !== undefined) p.pr3d = c.pr3d;
  if (c.m3rc !== undefined) p.m3rc = c.m3rc;
  if (c.b9Mode !== undefined) p.b9Mode = c.b9Mode;
  if (c.riskProfile !== undefined) p.riskProfile = c.riskProfile;
  if (c.predLean !== undefined) p.predLean = c.predLean;
  if (c.gapRegime !== undefined) p.gapRegime = c.gapRegime;
  if (c.discPick !== undefined) p.discPick = c.discPick;
  if (c.v4c !== undefined) p.v4c = c.v4c;
  return p;
}

export function controlsFromDesk(s: DeskState): Partial<AdminControls> {
  return {
    b7: s.b7,
    bots16: s.bots16,
    gmMode: s.gmMode,
    g0On: s.g0On,
    b8: s.b8,
    b9: s.b9,
    pr3d: s.pr3d,
    m3rc: s.m3rc,
    b9Mode: s.b9Mode,
    riskProfile: s.riskProfile,
    predLean: s.predLean,
    gapRegime: s.gapRegime,
    discPick: s.discPick,
    v4c: s.v4c,
  };
}

export function useAdminFlag(key: keyof AdminControls, fallback = false) {
  const [on, setOn] = useState(fallback);
  useEffect(() => {
    const saved = readAdminControls()[key];
    if (typeof saved === "boolean") setOn(saved);
  }, [key]);
  const set = (v: boolean | ((prev: boolean) => boolean)) => {
    setOn((prev) => {
      const next = typeof v === "function" ? v(prev) : v;
      writeAdminControls({ [key]: next } as Partial<AdminControls>);
      return next;
    });
  };
  return [on, set] as const;
}
