# Development and verification record

## Scope

- Working repository: `comp4020-ass2-RyoudoTeinei`.
- Course: SLOP1954, How to Leave: Cancelling Subscriptions.
- Build undertaken on 20 September 2026.
- English course content; no personal account or payment data is used.
- This is a locally reviewable course prototype. No push, public visibility
  change or GitHub Pages deployment was performed in this task.
- PROCESS.md is an agent-assisted factual draft for the student's review.

## Development checkpoints

- `a4f0034`: consumer-oriented rules and curriculum test contract; portable
  installation of the supplied secret-scanning hook.
- `9079970`: course collections, sourced platform cases, editorial interface,
  original receipt artwork, practice materials and lab.
- `4fd56e2`: actionable platform instructions, proposed-result lab label,
  course dates derived from metadata, mobile deck typography and touch controls.

## Verification observed

- `pnpm check`: 0 type errors; 39 static pages generated.
- Template accessibility scan: no violations on the 39 pages.
- Template internal-link and base-path checks: passed.
- Generated API: 29 nodes and 30 edges; fixed schemas and integration unchanged.
- Course tests: 3 files, 12 tests passed.
- Slop palette and marks, `astro.config.ts`, `src/content.config.ts`,
  `pnpm-lock.yaml` and `mise.toml` preserve the supplied platform.
- No STARTER_CONTENT markers or CJK text found in authored source/materials.
- Browser viewport checks: 1920x1080 and 390x844.
- Observed homepage and lecture layouts; phone navigation opens correctly.
- Production search for Adobe returns the case lessons and workshop.
- Three practice cases reach their own completion records. Wrong-channel and
  assumed-success answers produce explanations rather than advance.
- Phone/desktop deck review: nine slides, readable type, no observed text
  overflow; next/previous controls work in the production preview.
- The production lab reported no console errors or warnings during the check.

## Local work

Use a PowerShell session with the template's mise Node 24 / pnpm 11.9.0 tools
available, including the mise `npx` executable shim on Windows.

```powershell
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm check:evidence
```

The URL includes the repository base path:
`http://127.0.0.1:4321/comp4020-ass2-RyoudoTeinei/`.

A separate production preview was started on port 4322 to exercise the built
search index and the pages without a development toolbar:
`http://127.0.0.1:4322/comp4020-ass2-RyoudoTeinei/`.

The editable social artwork is `src/assets/images/course-card.svg`.
After changing it, run `node scripts/render-card.ts` to regenerate its PNG.
The fixed Astro image pipeline then creates the sharing image from that PNG.

## Before a real submission

Review the curriculum and source scope, put PROCESS.md into your own account,
then run the evidence gate again. Publishing and submission still need the
normal course shipping workflow; a local preview is not a submitted site.
