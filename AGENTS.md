# Contributor and Agent Guide

## Purpose

This repository contains the public, static engineering portfolio for Mohammad Zeno. It is
intended for technical recruiters, engineering managers, backend leads, and software teams. The
site must remain credible, accessible, fast, and conservative about professional claims.

## Architecture

- Astro performs static generation; there is no server, database, or form backend.
- Pages CMS is a Git-backed editing layer configured by `.pages.yml`; it writes managed content
  and media to this repository and does not run as part of the production site.
- TypeScript runs in strict mode.
- Professional and page content lives in validated collections under `src/content/`.
- Reusable presentation lives in `src/components/`.
- Page composition lives in `src/pages/`; shared document structure lives in `src/layouts/`.
- Design tokens and global presentation live in `src/styles/`.
- Static assets live in `public/`; evidence-based diagrams live in
  `public/assets/diagrams/`.

Keep content separate from visual components. Prefer semantic HTML and CSS over client-side
JavaScript. Do not add a framework integration, component library, tracker, cookie, third-party
form, or runtime dependency without a concrete requirement.

## Source of truth

The read-only `main` branch of `muammed1/career-knowledge-base` is the authoritative source for
professional facts. This public repository is not a substitute source.

- Never modify the knowledge-base repository as part of portfolio work.
- Never copy source documents, internal notes, PDFs, or the full knowledge base here.
- Extract only the minimum public-safe fact needed by a page.
- Record path-level provenance in `CONTENT_SOURCES.md`; do not paste private source text.
- Follow the knowledge base's governance, evidence hierarchy, and conflict rules.
- When sources disagree, use the more conservative externally safe wording and record the issue
  in `CONTENT_GAPS.md`.

The target repository name, existing portfolio copy, issue text, or a global skill list is not
evidence for a project-specific claim.

## Factual integrity

Before changing career content:

1. Read the relevant authoritative source files from the knowledge-base `main` branch.
2. Establish whether each fact is verified, owner-stated, partially documented, or unresolved.
3. Use the narrowest wording supported by the evidence.
4. Update the structured content file.
5. Add or update its path-level mapping in `CONTENT_SOURCES.md`.
6. Record unresolved facts, asset gaps, and conflicts in `CONTENT_GAPS.md`.
7. Re-read the rendered page for accidental inference or exaggeration.

Do not claim unsupported technologies, responsibilities, ownership, metrics, adoption numbers,
performance, traffic, revenue, cloud deployment, testing coverage, security guarantees,
scalability, leadership, certification, or education outcomes. Do not automatically attribute a
global professional skill to Gymbo. Keep learning-stage AI topics visibly separate from
professional production experience.

For Gymbo, do not claim microservices, Domain-Driven Design, Clean Architecture, event-driven
architecture, AWS, Docker, Kubernetes, CI/CD, formal double-entry accounting, real-time device
synchronization, complete auditing, fraud-proof operation, tax compliance, complete security,
sub-second performance, or exact client/facility counts unless new authoritative evidence
resolves the current gaps.

## Commands

Use npm and the committed lockfile.

```sh
npm ci
npm run dev
npm run validate:content
npm run format
npm run format:check
npm run check
npm run build
npm run preview
```

Use `npm install` only when intentionally changing dependencies and commit the resulting
`package-lock.json`.

## Testing requirements

Before handing off a change, run:

```sh
npm run validate:content
npm run format:check
npm run check
npm run build
```

Also verify:

- required routes and internal links;
- no broken or missing referenced assets;
- keyboard navigation, visible focus, heading order, and semantic landmarks;
- approximately 320 px mobile, tablet, and desktop layouts;
- `prefers-reduced-motion` behavior;
- the resume fallback and any download link;
- `/404.html` in the production build;
- no placeholder text, unsupported claims, secrets, client-sensitive material, or copied
  knowledge-base files.

Use the browser to inspect the built site when available. Do not treat a successful build as
proof that visual, accessibility, or factual review passed.

## Assets

Do not fabricate product screenshots or generate a fake Gymbo interface. Until approved,
sanitized screenshots exist, keep screenshot UI hidden and use clearly labeled technical
illustrations. Do not create a fake or empty resume PDF.

Pages CMS-managed profile and project images live below their respective `src/content/`
directories so Astro can validate and optimize them. Raster uploads are limited to 8 MB. Project
Markdown must give every image meaningful alternative text. Existing evidence-based SVG diagrams
remain in `public/assets/diagrams/`.

The optional public resume belongs at:

`public/resume/Mohammad_Zeno_Backend_Developer_Resume.pdf`

It must be a general professional resume without another company's branding or a
company-specific footer.

## Content editing

Routine content and media updates may be made through the hosted Pages CMS application on `main`.
This is the one intentional exception to the feature-branch workflow for code:

- Keep new projects unpublished until their content, evidence boundary, images, links, and
  alternative text have been reviewed.
- Do not use the visual editor to broaden a verified claim or fill an evidence gap.
- Never place private source text, credentials, client-sensitive records, or local filesystem
  paths in a CMS field; the repository and its history are public.
- Treat a failed content deployment as a validation signal. Correct the managed content through
  Pages CMS; do not bypass the build.
- Changes to schemas, layouts, components, workflows, or `.pages.yml` remain code changes and must
  use a feature branch and pull request.

## Deployment

`.github/workflows/deploy-pages.yml` is the deployment path. It validates and builds pushes to
`main`, uploads `dist`, and deploys through the `github-pages` environment.

- Keep dependency installation reproducible with `npm ci`.
- Keep permissions job-scoped: the build needs `contents: read` and `pages: read`; deployment
  needs only `pages: write` and `id-token: write`.
- Do not add repository secrets for standard GitHub Pages deployment.
- Do not bypass validation or publish an unreviewed build manually.
- Do not state that a deployment succeeded until its workflow and production URL are verified.
- A custom domain requires an intentional `public/CNAME`, Astro `site` update, DNS verification,
  and the GitHub Pages setting described in `README.md`.

## Scope discipline

Prefer small, reviewable changes. Avoid premature abstraction and unnecessary governance files.
Preserve accessibility and factual-integrity behavior when refactoring. If evidence is missing,
leave the claim out and document the gap instead of filling it with an assumption.
