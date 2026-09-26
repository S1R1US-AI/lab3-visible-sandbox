#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../src", import.meta.url).pathname;
const FORBIDDEN = ["scoreSleeveAdd", "api.typesafe.ai", "sleeve_add_allowed", "from \"./jev-gate", "from \"@/lib/jev-"];
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(ts|tsx|js|mjs)$/.test(name)) {
      const text = readFileSync(p, "utf8");
      for (const needle of FORBIDDEN) {
        if (text.includes(needle)) hits.push(`${p}: ${needle}`);
      }
    }
  }
}
walk(ROOT);
if (hits.length) {
  console.error("Jev leaked into src/:");
  for (const h of hits) console.error(" ", h);
  process.exit(1);
}
console.log("PASS · no in-app Jev in src/");
