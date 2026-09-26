/** Admin-only graduate research pick. Persist. Never votes HIGH. */
import { create } from "zustand";
import { readAdminControls, writeAdminControls } from "./admin-settings";
import { GRAD_SELECT, resolveGradResearchPick, type GradResearchPick } from "./research-security";

type GradPickState = GradResearchPick & {
  setProject: (id: string) => void;
  setQuoteOnPaper: (v: boolean) => void;
  setFeedNn: (v: boolean) => void;
  hydrate: () => void;
};

export const useGradPick = create<GradPickState>((set, get) => ({
  id: GRAD_SELECT,
  quoteOnPaper: false,
  feedNn: false,
  setProject: (id) => {
    const next =
      id === GRAD_SELECT
        ? { id: GRAD_SELECT, quoteOnPaper: false, feedNn: false }
        : { id, quoteOnPaper: get().quoteOnPaper, feedNn: get().feedNn };
    writeAdminControls({
      gradProjectId: next.id,
      gradQuoteOnPaper: next.quoteOnPaper,
      gradFeedNn: next.feedNn,
    });
    set(next);
  },
  setQuoteOnPaper: (quoteOnPaper) => {
    if (get().id === GRAD_SELECT) return;
    writeAdminControls({ gradQuoteOnPaper: quoteOnPaper });
    set({ quoteOnPaper });
  },
  setFeedNn: (feedNn) => {
    if (get().id === GRAD_SELECT) return;
    writeAdminControls({ gradFeedNn: feedNn });
    set({ feedNn });
  },
  hydrate: () => {
    const s = readAdminControls();
    set({
      id: s.gradProjectId || GRAD_SELECT,
      quoteOnPaper: Boolean(s.gradQuoteOnPaper),
      feedNn: Boolean(s.gradFeedNn),
    });
  },
}));

export function useResolvedGrad() {
  const pick = useGradPick();
  return resolveGradResearchPick(pick);
}