import assert from "node:assert/strict";
import test from "node:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, basename } from "node:path";

/** Coined nouns banned from live src/ (sandbox-original snapshot is historical). */
function bannedPatterns(): RegExp[] {
  // Built from parts so this guard file does not contain the banned phrases itself.
  return [
    new RegExp(["fully", "loaded"].join("\\s+"), "i"),
    new RegExp(["top", "5%"].join("\\s*"), "i"),
    new RegExp(["1h", "bias"].join("\\s+"), "i"),
  ];
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx|js|mjs|css|md|html)$/.test(name)) out.push(p);
  }
  return out;
}

test("live src/ has no coined nouns from the banned desk lexicon", () => {
  const root = join(process.cwd(), "src");
  const patterns = bannedPatterns();
  const hits: string[] = [];
  for (const file of walk(root)) {
    if (basename(file) === "drift-nouns.test.ts") continue;
    const text = readFileSync(file, "utf8");
    for (const re of patterns) {
      if (re.test(text)) hits.push(`${file} matches ${re}`);
    }
  }
  assert.deepEqual(hits, []);
});
