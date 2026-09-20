import { execFileSync } from "node:child_process";

// Keep the starter's secret-scanning hook on Windows as well as Unix.
// Source archives without a .git directory have no hooks to install.
let inRepository = false;
try {
  execFileSync("git", ["rev-parse", "--git-dir"], { stdio: "ignore" });
  inRepository = true;
} catch {
  console.info("No Git checkout; skipping hook installation.");
}
if (inRepository) {
  execFileSync("git", ["config", "core.hooksPath", ".githooks"], { stdio: "inherit" });
}
