import { create } from "zustand";
import {
  type DeskState,
  type PredLean,
  type GapRegime,
  type GmMode,
  type G0Live,
  type LiveIngest,
  eightCall,
  nineCall,
  pr3dModifier,
  fitness,
  coreWithV4c,
  v4cCall,
  activeLanes,
  gapScan,
  RISK_MIN,
  RISK_MAX,
} from "./desk-logic";
import { controlsFromDesk, deskPatchFromControls, readAdminControls, writeAdminControls } from "./admin-settings";
import { useGradPick } from "./grad-pick-store";

const seed = (): DeskState => ({
  b7: true,
  bots16: true,
  gmMode: "off",
  g0On: false,
  g0Live: null as G0Live | null,
  liveIngest: null as LiveIngest | null,
  b8: false,
  b9: false,
  pr3d: false,
  m3rc: false,
  b9Mode: "manual",
  riskProfile: 10,
  predLean: "mixed",
  gapRegime: "mixed",
  discPick: "select" as const,
  v4c: false,
  callLog: [],
  pending: null,
  pendingApproved: null,
  core: { p: 1840, l: 0, btc: 0.42, usdc: 0 },
  b8pl: { p: 120, l: 40, btc: 0, usdc: 80 },
  b9pl: { p: 80, l: 20, btc: 0, usdc: 180 },
  token: { p: 22, l: 8, btc: 0, usdc: 14 },
  agents: { p: 540, l: 210, btc: 0.01, usdc: 90 },
  simPaused: false,
});

type ToggleKey = "b7" | "bots16" | "b8" | "b9" | "pr3d" | "m3rc" | "v4c";

type Actions = {
  toggle: (k: ToggleKey) => void;
  setGm: (m: GmMode) => void;
  toggleG0: () => void;
  setG0Live: (p: G0Live | null) => void;
  setLiveIngest: (p: LiveIngest | null) => void;
  setMode: (m: "manual" | "auto") => void;
  setRisk: (n: number) => void;
  setPredLean: (p: PredLean) => void;
  setGapRegime: (g: GapRegime) => void;
  setDiscPick: (p: DeskState["discPick"]) => void;
  approve: () => void;
  deny: () => void;
  reset: () => void;
};

export const useDesk = create<DeskState & Actions>()((set, get) => ({
  ...seed(),
  toggle: (k) => {
    if (k === "b8" || k === "m3rc") {
      const next = k === "b8" ? !get().b8 : !get().m3rc;
      set({ b8: next, m3rc: next, pendingApproved: null });
      return;
    }
    set({ [k]: !get()[k], pendingApproved: null } as Partial<DeskState>);
  },
  setGm: (m) => set({ gmMode: m === "off" ? "off" : get().gmMode === m ? "off" : m }),
  toggleG0: () => set({ g0On: !get().g0On, g0Live: get().g0On ? null : get().g0Live }),
  setG0Live: (g0Live) => set({ g0Live }),
  setLiveIngest: (liveIngest) => set({ liveIngest }),
  setMode: (m) => set({ b9Mode: m, pendingApproved: null }),
  setRisk: (n) => {
    const riskProfile = Math.min(RISK_MAX, Math.max(RISK_MIN, Math.round(n)));
    set({ riskProfile, pendingApproved: null });
  },
  setPredLean: (predLean) => set({ predLean, pendingApproved: null }),
  setGapRegime: (gapRegime) => set({ gapRegime, pendingApproved: null }),
  setDiscPick: (discPick) => {
    if (discPick === "select") {
      set({ discPick });
      return;
    }
    set({ discPick, gapRegime: discPick, pendingApproved: null });
  },
  approve: () => {
    const s = get();
    const lanes = activeLanes(s);
    const n = nineCall(s, lanes);
    if (!n.yes || !n.needsCoord || n.action !== "ACCUMULATE") {
      set({
        pendingApproved: false,
        pending: `Approve blocked · risk ${s.riskProfile}% · ${s.b9Mode} · discount ${s.discPick} · ${n.reason}`,
        callLog: [`Coordinator D-path · nothing approvable · ${n.reason}`, ...s.callLog].slice(0, 40),
      });
      return;
    }
    const add = Math.max(4, Math.round(8 * (s.riskProfile / RISK_MAX) * (n.navPct / 0.01)));
    set({
      pendingApproved: true,
      pending: `USER Approve applied · risk ${s.riskProfile}% · ${s.b9Mode} · discount ${s.discPick} · sleeve paper add · core stack untouched`,
      callLog: [
        `Coordinator (bot 6) A · paper ACCUMULATE sleeve ${n.navPct * 100}% · core stack untouched · ${s.b9Mode}`,
        ...s.callLog,
      ].slice(0, 40),
      b9pl: {
        ...s.b9pl,
        p: s.b9pl.p + add,
        btc: s.b9pl.btc + add / 60000,
        usdc: Math.max(0, s.b9pl.usdc - add),
      },
    });
  },
  deny: () => {
    const s = get();
    set({
      pendingApproved: false,
      pending: `USER Deny applied · no clip · risk ${s.riskProfile}% · ${s.b9Mode} · discount ${s.discPick} · core stack untouched`,
      callLog: ["Coordinator (bot 6) D · no clip · core stack untouched", ...s.callLog].slice(0, 40),
    });
  },
  reset: () => set({ ...seed() }),
}));

export function useDerived() {
  const s = useDesk();
  const lanes = activeLanes(s);
  const core = coreWithV4c(s, lanes);
  return {
    eight: eightCall(s),
    nine: nineCall(s, lanes),
    pr3d: pr3dModifier(s, core.stance),
    v4c: v4cCall(s),
    fit: fitness(s, lanes),
    high: fitness(s, lanes).high,
    lanes,
    core,
    gap: gapScan(s.gapRegime),
  };
}

let adminHydrated = false;

export function hydrateAdminSettings() {
  if (typeof window === "undefined") return;
  const saved = readAdminControls();
  const deskPatch = deskPatchFromControls(saved);
  if (Object.keys(deskPatch).length) useDesk.setState(deskPatch);
  useGradPick.getState().hydrate();
  if (!adminHydrated) {
    adminHydrated = true;
    useDesk.subscribe((s) => writeAdminControls(controlsFromDesk(s)));
  }
}
