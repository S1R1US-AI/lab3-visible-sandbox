/** Admin-only Research Security for GO-6 Neural Network. Not a HIGH vote. Never sells. */

export type ResearchVerdict = "PASS" | "REJECT";
export type ScanKind =
  | "university"
  | "google-scholar"
  | "bot-claim"
  | "agent-claim"
  | "online-research";
export type ResearchRejectReason =
  | "not-official-host"
  | "not-scholar-or-university"
  | "unprovable"
  | "unverifiable"
  | "false"
  | "misleading"
  | "no-real-world-use-case"
  | "not-live-tape";

export type ResearchCandidate = {
  id: string;
  title: string;
  url: string;
  claimedUse: string;
  kind: ScanKind;
  liveTapeMatch: boolean;
  realWorldUseCase: boolean;
  officialPosted: boolean;
  falseClaim: boolean;
  misleading: boolean;
  documentedQuote?: string;
  /** Verified page the admin can actually open. Never a Scholar ?q= search. */
  readUrl?: string;
  helpUrl?: string;
};

export type ResearchScan = {
  candidate: ResearchCandidate;
  officialHost: boolean;
  scholarOrUniversity: boolean;
  verdict: ResearchVerdict;
  reasons: ResearchRejectReason[];
  note: string;
};

export type SurfaceScan = {
  surface: string;
  kind: ScanKind;
  url: string;
  liveTapeMatch: boolean;
  realWorldUseCase: boolean;
};

const SCHOLAR_HOSTS = new Set(["scholar.google.com", "scholar.googleusercontent.com"]);

const UNIVERSITY_HOST_RE =
  /(^|\.)((edu)|(ac\.uk)|(edu\.au)|(ac\.jp)|(edu\.sg)|(ox\.ac\.uk)|(cam\.ac\.uk)|(harvard\.edu)|(mit\.edu)|(stanford\.edu)|(princeton\.edu)|(yale\.edu)|(columbia\.edu)|(berkeley\.edu)|(caltech\.edu)|(uchicago\.edu)|(cmu\.edu)|(cornell\.edu)|(upenn\.edu)|(umich\.edu)|(utexas\.edu)|(gatech\.edu)|(ucl\.ac\.uk)|(imperial\.ac\.uk)|(ethz\.ch)|(epfl\.ch)|(utoronto\.ca)|(mcgill\.ca))$/i;

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function isScholarHost(host: string) {
  return SCHOLAR_HOSTS.has(host) || host.endsWith(".scholar.google.com");
}

export function isUniversityHost(host: string) {
  if (!host) return false;
  if (host.endsWith(".edu")) return true;
  return UNIVERSITY_HOST_RE.test(host);
}

export function isOfficialResearchHost(host: string) {
  return isScholarHost(host) || isUniversityHost(host);
}

/** Google Scholar ?q= searches are blocked as "automated queries". Do not use as open-article links. */
export function isScholarSearchQuery(url: string) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();
    if (!isScholarHost(host)) return false;
    if (u.searchParams.has("q")) return true;
    if (u.pathname.includes("/scholar") && u.search.length > 0 && !u.pathname.includes("help")) {
      if (u.searchParams.has("cluster") || u.searchParams.has("view_op") || u.pathname.includes("citations")) {
        return false;
      }
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export function articleHref(url: string, readUrl?: string) {
  const href = readUrl || url;
  if (isScholarSearchQuery(href)) return "https://scholar.google.com/";
  return href;
}

export const SCHOLAR_HOME = "https://scholar.google.com/";
export const SCHOLAR_HELP = "https://scholar.google.com/scholar/help.html";
export const SCHOLAR_CITATIONS_BTC =
  "https://scholar.google.com/citations?user=15nToYUAAAAJ&hl=en";

/** Verify claim against officially posted live tape (Coinbase / ETF prints in this sandbox). */
export function verifyAgainstOfficialLiveData(liveTapeMatch: boolean, officialPosted: boolean) {
  return liveTapeMatch && officialPosted;
}

export function scanCandidate(c: ResearchCandidate): ResearchScan {
  const host = hostOf(c.url);
  const officialHost = isOfficialResearchHost(host);
  const scholarOrUniversity = isScholarHost(host) || isUniversityHost(host);
  const reasons: ResearchRejectReason[] = [];
  if (!officialHost) reasons.push("not-official-host");
  if (!scholarOrUniversity) reasons.push("not-scholar-or-university");
  if (!c.realWorldUseCase) reasons.push("no-real-world-use-case");
  if (!verifyAgainstOfficialLiveData(c.liveTapeMatch, c.officialPosted)) {
    if (!c.liveTapeMatch) reasons.push("not-live-tape");
    if (!c.officialPosted) reasons.push("unprovable");
  }
  if (!c.url.startsWith("https://")) reasons.push("unverifiable");
  if (c.falseClaim) reasons.push("false");
  if (c.misleading) reasons.push("misleading");
  const verdict: ResearchVerdict = reasons.length === 0 ? "PASS" : "REJECT";
  const note =
    verdict === "PASS"
      ? "PASS. Official university or Google Scholar + live tape + real-world use. Eligible for Neural Network Agent 9 only."
      : `REJECT. ${reasons.join(", ")}. Do not include in Neural Network, recursive learning, or admin full awareness.`;
  return { candidate: c, officialHost, scholarOrUniversity, verdict, reasons, note };
}

export function nnMayIngest(scan: ResearchScan) {
  return scan.verdict === "PASS";
}

/** Extra gate: bot / internal / external agent / online research claims. */
export function agentResearchAllowed(url: string, liveTapeMatch: boolean, realWorldUseCase: boolean) {
  return nnMayIngest(
    scanCandidate({
      id: "agent",
      title: "agent-claim",
      url,
      claimedUse: "agent",
      kind: "agent-claim",
      liveTapeMatch,
      realWorldUseCase,
      officialPosted: liveTapeMatch && realWorldUseCase,
      falseClaim: false,
      misleading: false,
    }),
  );
}

/** Bots 1–7, G0, PR3D, VACUUM, 8/9, P@MP, hive, external AI: REJECT never informs CLIP or HIGH. */
export function botMayIngestResearch(scan: ResearchScan) {
  return nnMayIngest(scan);
}

export const RESEARCH_FIXTURES: ResearchCandidate[] = [
  {
    id: "mit-btc",
    title: "MIT CSAIL — official university host",
    url: "https://www.csail.mit.edu/",
    readUrl: "https://www.csail.mit.edu/",
    claimedUse: "University BTC / systems research host",
    kind: "university",
    liveTapeMatch: true,
    realWorldUseCase: true,
    officialPosted: true,
    falseClaim: false,
    misleading: false,
    documentedQuote:
      "MIT CSAIL (official .edu host): real-world systems research. Eligible after live-tape match. Not a trade signal. Never sells the stack.",
  },
  {
    id: "stanford-scholar",
    title: "Google Scholar — official graduate index (home + citations, not a search query)",
    url: SCHOLAR_HOME,
    readUrl: SCHOLAR_CITATIONS_BTC,
    helpUrl: SCHOLAR_HELP,
    claimedUse: "Scholar index of graduate papers",
    kind: "google-scholar",
    liveTapeMatch: true,
    realWorldUseCase: true,
    officialPosted: true,
    falseClaim: false,
    misleading: false,
    documentedQuote:
      "Google Scholar official index (home and author citations). Search URLs with ?q= are blocked by Google as automated queries; open Scholar home, help, or a citations page instead. Never a HIGH vote.",
  },
  {
    id: "oxford-cs",
    title: "University of Oxford Department of Computer Science — official graduate host",
    url: "https://www.cs.ox.ac.uk/",
    readUrl: "https://www.cs.ox.ac.uk/",
    claimedUse: "Graduate CS host; systems research with real-world deployment record",
    kind: "university",
    liveTapeMatch: true,
    realWorldUseCase: true,
    officialPosted: true,
    falseClaim: false,
    misleading: false,
    documentedQuote:
      "Oxford Computer Science (official ac.uk host): graduate systems research with verifiable real-world applications. Screened PASS. Informs awareness only. Never sells bitcoin.",
  },
  {
    id: "social-pnl-loop",
    title: "Unaudited social PnL / X marketing (not university tape)",
    url: "https://x.com/coinbase",
    readUrl: "https://x.com/coinbase",
    claimedUse: "Unverified social PnL without public university tape",
    kind: "online-research",
    liveTapeMatch: false,
    realWorldUseCase: false,
    officialPosted: false,
    falseClaim: false,
    misleading: true,
  },
  {
    id: "blog-alpha",
    title: "Unofficial encyclopedia page — not graduate research",
    url: "https://en.wikipedia.org/wiki/Bitcoin",
    readUrl: "https://en.wikipedia.org/wiki/Bitcoin",
    claimedUse: "Unverified public page, not official university research",
    kind: "online-research",
    liveTapeMatch: false,
    realWorldUseCase: false,
    officialPosted: false,
    falseClaim: false,
    misleading: false,
  },
  {
    id: "false-edu",
    title: "Official host with false guaranteed-return claim",
    url: "https://www.csail.mit.edu/",
    readUrl: "https://www.csail.mit.edu/",
    claimedUse: "Guaranteed 10,000 percent BTC return",
    kind: "university",
    liveTapeMatch: false,
    realWorldUseCase: false,
    officialPosted: false,
    falseClaim: true,
    misleading: true,
  },
];

export const SURFACE_SCANS: SurfaceScan[] = [
  {
    surface: "B0Ts 1-6",
    kind: "bot-claim",
    url: "https://x.com/coinbase",
    liveTapeMatch: false,
    realWorldUseCase: false,
  },
  {
    surface: "7-B0T",
    kind: "bot-claim",
    url: "https://en.wikipedia.org/wiki/Bitcoin",
    liveTapeMatch: false,
    realWorldUseCase: false,
  },
  {
    surface: "G0DZ1LLa M0D3",
    kind: "agent-claim",
    url: "https://x.com/coinbase",
    liveTapeMatch: false,
    realWorldUseCase: false,
  },
  {
    surface: "external AI / H1V3",
    kind: "agent-claim",
    url: SCHOLAR_HOME,
    liveTapeMatch: true,
    realWorldUseCase: true,
  },
  {
    surface: "online research",
    kind: "online-research",
    url: "https://en.wikipedia.org/wiki/Bitcoin",
    liveTapeMatch: false,
    realWorldUseCase: false,
  },
];

export function runSurfaceScans(items: SurfaceScan[] = SURFACE_SCANS) {
  return items.map((s) => {
    const scan = scanCandidate({
      id: s.surface,
      title: s.surface,
      url: s.url,
      claimedUse: s.kind,
      kind: s.kind,
      liveTapeMatch: s.liveTapeMatch,
      realWorldUseCase: s.realWorldUseCase,
      officialPosted: s.liveTapeMatch && s.realWorldUseCase,
      falseClaim: false,
      misleading: false,
    });
    return { ...s, scan, allowed: botMayIngestResearch(scan) };
  });
}

export const RESEARCH_SECURITY_STAMP = "2026-09-16 13:30:00 EDT · S1R1US.ai Proprietary";

export function runResearchSecurityScan(items: ResearchCandidate[] = RESEARCH_FIXTURES) {
  const scans = items.map(scanCandidate);
  const passed = scans.filter((s) => s.verdict === "PASS");
  const rejected = scans.filter((s) => s.verdict === "REJECT");
  const surfaces = runSurfaceScans();
  return {
    stamp: RESEARCH_SECURITY_STAMP,
    scanned: scans.length,
    passed: passed.length,
    rejected: rejected.length,
    nnIngest: passed.map((s) => s.candidate.id),
    blocked: rejected.map((s) => s.candidate.id),
    scans,
    surfaces,
    surfacesAllowed: surfaces.filter((s) => s.allowed).map((s) => s.surface),
    surfacesBlocked: surfaces.filter((s) => !s.allowed).map((s) => s.surface),
  };
}

export const GRAD_SELECT = "select";

export function passedGraduateProjects(items: ResearchCandidate[] = RESEARCH_FIXTURES) {
  return items
    .map(scanCandidate)
    .filter((s) => s.verdict === "PASS" && (s.candidate.kind === "university" || s.candidate.kind === "google-scholar"));
}

export type GradResearchPick = {
  id: string;
  quoteOnPaper: boolean;
  feedNn: boolean;
};

export function resolveGradResearchPick(pick: GradResearchPick) {
  const idle = {
    scan: null as ResearchScan | null,
    quote: null as string | null,
    onPaper: false,
    nn: false,
    title: "",
    url: "",
    readUrl: "",
    helpUrl: "",
    awarenessLine: "MAKE YOUR SELECTION · no graduate research quoted · Neural Network not fed",
  };
  if (!pick.id || pick.id === GRAD_SELECT) return idle;
  const scan = scanCandidate(RESEARCH_FIXTURES.find((c) => c.id === pick.id) ?? {
    id: pick.id,
    title: "unknown",
    url: "https://invalid.example",
    claimedUse: "",
    kind: "online-research",
    liveTapeMatch: false,
    realWorldUseCase: false,
    officialPosted: false,
    falseClaim: false,
    misleading: false,
  });
  if (scan.verdict !== "PASS") {
    return {
      ...idle,
      awarenessLine: "REJECT · not eligible · Neural Network not fed · no quote",
    };
  }
  const quote = scan.candidate.documentedQuote ?? scan.candidate.claimedUse;
  const onPaper = Boolean(pick.quoteOnPaper);
  const nn = Boolean(pick.feedNn) && nnMayIngest(scan);
  return {
    scan,
    quote,
    onPaper,
    nn,
    title: scan.candidate.title,
    url: scan.candidate.url,
    readUrl: articleHref(scan.candidate.url, scan.candidate.readUrl),
    helpUrl: scan.candidate.helpUrl ?? (isScholarHost(hostOf(scan.candidate.url)) ? SCHOLAR_HELP : ""),
    awarenessLine: nn
      ? `NN FEED ON · ${scan.candidate.title} · Agent 9 awareness + recursive learning · never HIGH · never sells`
      : onPaper
        ? `QUOTE ON PAPER · ${scan.candidate.title} · Neural Network not fed`
        : `SELECTED · ${scan.candidate.title} · quote off · Neural Network not fed`,
  };
}
