/**
 * Isolated P@MP.fun store. Do not merge into useDesk.
 * reset of S1R1US desk does not clear this store.
 * Live feed polls must not change pumpOn.
 */
import { create } from "zustand";
import { pullPumpFeed, type PumpFeed } from "./pump-feed";
import { PUMP_TICKERS, refreshPumpNames, type PumpTicker } from "./pump-plan";
import { readAdminControls, writeAdminControls } from "./admin-settings";

type PumpState = {
  pumpOn: boolean;
  feed: PumpFeed | null;
  tickers: PumpTicker[];
  busy: boolean;
  togglePump: () => void;
  armOn: () => void;
  setFeed: (f: PumpFeed | null) => void;
  refresh: () => Promise<void>;
};

export const usePump = create<PumpState>((set, get) => ({
  pumpOn: false,
  feed: null,
  tickers: PUMP_TICKERS,
  busy: false,
  togglePump: () => {
    const next = !get().pumpOn;
    set({ pumpOn: next, feed: next ? get().feed : get().feed });
    writeAdminControls({ pumpOn: next });
  },
  armOn: () => {
    set({ pumpOn: true });
    writeAdminControls({ pumpOn: true });
  },
  setFeed: (feed) => set({ feed }),
  refresh: async () => {
    set({ busy: true });
    const feed = await pullPumpFeed();
    set({ feed, tickers: refreshPumpNames(), busy: false });
  },
}));

export function hydratePumpSettings() {
  if (typeof window === "undefined") return;
  const saved = readAdminControls();
  if (typeof saved.pumpOn === "boolean") usePump.setState({ pumpOn: saved.pumpOn });
}