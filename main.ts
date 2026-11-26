import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const text =
  "1%. tell my charger i saw him with the tablet. also delete my 4,000 receipt screenshots. i kept them for an audit that isn't coming.";

function assertValidText(value) {
  const chars = [...value].length;
  if (chars < 1 || chars > 200 || value.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
  if (/[\r\n]/.test(value)) {
    throw new Error("entry fails the gate: text must be one line");
  }
}

function writeEntryAtomically(outputDir, value) {
  mkdirSync(outputDir, { recursive: true });
  const tmp = join(outputDir, ".entry.txt.tmp");
  writeFileSync(tmp, value, "utf8");
  renameSync(tmp, join(outputDir, "entry.txt"));
}

assertValidText(text);
writeEntryAtomically(process.env.MAKEFUN_OUTPUT_DIR || "/output", text);
