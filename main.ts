// Say What Actually Broke — make.fun bounty entry (program/v1).
//
// Writes one single-line software error message to /output/entry.txt:
// the brutal truth about what broke, in plain words, with a joke a
// reader repeats out loud — plus the one thing to do next, because a
// veteran SRE's error message names the failure AND the fix.
//
// No file reads, no network, no randomness: the same bytes on every
// run, from any working directory. The gate is checked here too — the
// text must be UTF-8, 1–200 characters, a single line, not only
// whitespace — so a bad edit fails loudly instead of shipping invalid.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "What broke: the deploy script trusted a config file that only existed on my laptop, and my laptop died halfway through the deploy. Check in the config.";

if (
  ENTRY.length < 1 ||
  ENTRY.length > 200 ||
  ENTRY.includes("\n") ||
  ENTRY.trim().length === 0
) {
  throw new Error(
    `entry violates the gate: ${ENTRY.length} chars, must be a single line of 1-200 characters`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
