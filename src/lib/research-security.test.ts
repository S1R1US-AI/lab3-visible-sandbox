import assert from "node:assert/strict";
import test from "node:test";
import {
  scanCandidate,
  nnMayIngest,
  agentResearchAllowed,
  botMayIngestResearch,
  runResearchSecurityScan,
  RESEARCH_FIXTURES,
  SURFACE_SCANS,
  passedGraduateProjects,
  resolveGradResearchPick,
  GRAD_SELECT,
  isScholarSearchQuery,
  articleHref,
} from "./research-security.ts";

test("official university and scholar PASS when tape + use-case true", () => {
  const mit = scanCandidate(RESEARCH_FIXTURES.find((c) => c.id === "mit-btc")!);
  const scholar = scanCandidate(RESEARCH_FIXTURES.find((c) => c.id === "stanford-scholar")!);
  assert.equal(mit.verdict, "PASS");
  assert.equal(scholar.verdict, "PASS");
  assert.equal(nnMayIngest(mit), true);
  assert.equal(botMayIngestResearch(mit), true);
});

test("social, blog, and false claims REJECT and never enter the net", () => {
  const social = scanCandidate(RESEARCH_FIXTURES.find((c) => c.id === "social-pnl-loop")!);
  const blog = scanCandidate(RESEARCH_FIXTURES.find((c) => c.id === "blog-alpha")!);
  const falseEdu = scanCandidate(RESEARCH_FIXTURES.find((c) => c.id === "false-edu")!);
  assert.equal(social.verdict, "REJECT");
  assert.ok(social.reasons.includes("misleading"));
  assert.equal(blog.verdict, "REJECT");
  assert.equal(falseEdu.verdict, "REJECT");
  assert.ok(falseEdu.reasons.includes("false"));
  assert.equal(nnMayIngest(social), false);
  assert.equal(agentResearchAllowed("https://x.com/foo", false, false), false);
});

test("batch scan blocks unverifiable ids and extra bot surfaces", () => {
  const r = runResearchSecurityScan();
  assert.ok(r.nnIngest.includes("mit-btc"));
  assert.ok(r.blocked.includes("social-pnl-loop"));
  assert.ok(r.blocked.includes("blog-alpha"));
  assert.ok(r.blocked.includes("false-edu"));
  assert.ok(r.surfacesBlocked.includes("B0Ts 1-6"));
  assert.ok(r.surfacesBlocked.includes("7-B0T"));
  assert.ok(r.surfacesAllowed.includes("external AI / H1V3"));
});

test("admin may quote and feed PASS graduate research only", () => {
  const passed = passedGraduateProjects();
  assert.ok(passed.length >= 2);
  assert.ok(passed.every((s) => s.verdict === "PASS"));
  const idle = resolveGradResearchPick({ id: GRAD_SELECT, quoteOnPaper: true, feedNn: true });
  assert.equal(idle.nn, false);
  assert.equal(idle.onPaper, false);
  const mit = resolveGradResearchPick({ id: "mit-btc", quoteOnPaper: true, feedNn: true });
  assert.equal(mit.nn, true);
  assert.equal(mit.onPaper, true);
  assert.ok((mit.quote ?? "").includes("MIT"));
  const blocked = resolveGradResearchPick({
    id: "social-pnl-loop",
    quoteOnPaper: true,
    feedNn: true,
  });
  assert.equal(blocked.nn, false);
  assert.equal(blocked.onPaper, false);
});

test("Analysis never uses blocked Scholar search URLs or 404 placeholders", () => {
  assert.equal(isScholarSearchQuery("https://scholar.google.com/scholar?q=bitcoin+market+microstructure"), true);
  assert.equal(isScholarSearchQuery("https://scholar.google.com/"), false);
  assert.equal(isScholarSearchQuery("https://scholar.google.com/scholar/help.html"), false);
  assert.equal(isScholarSearchQuery("https://scholar.google.com/citations?user=15nToYUAAAAJ&hl=en"), false);
  assert.equal(
    articleHref("https://scholar.google.com/scholar?q=bitcoin+market+microstructure"),
    "https://scholar.google.com/",
  );
  for (const c of RESEARCH_FIXTURES) {
    assert.equal(isScholarSearchQuery(c.url), false);
    if (c.readUrl) assert.equal(isScholarSearchQuery(c.readUrl), false);
  }
  for (const s of SURFACE_SCANS) {
    assert.equal(isScholarSearchQuery(s.url), false);
  }
});
