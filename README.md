# Mohammad Zeno — Engineering Portfolio

A static, engineering-focused portfolio for Mohammad Zeno. It presents verified professional
experience, skills, education, and a substantial Gymbo case study without publishing private
source material or overstating incomplete evidence.

Canonical deployment target: `https://muammed1.github.io`

## Technology

- Astro
- strict TypeScript
- Astro content collections and typed data modules
- semantic HTML
- modern vanilla CSS with custom properties
- static SVG assets
- npm

The site has no backend, database, CMS, analytics tracker, cookies, contact-form service, or
client-side UI framework.

## Local setup

Requirements:

- Node.js 24
- npm

Install exactly the locked dependency graph:

```sh
git clone https://github.com/muammed1/muammed1.github.io.git
cd muammed1.github.io
npm ci
```

Start the development server:

```sh
npm run dev
```

Astro prints the local URL, normally `http://localhost:4321`.

## Commands

| Command                | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start the local Astro development server       |
| `npm run format`       | Format supported files with Prettier           |
| `npm run format:check` | Verify formatting without rewriting files      |
| `npm run check`        | Run Astro and TypeScript checks                |
| `npm run build`        | Validate and create the static site in `dist/` |
| `npm run preview`      | Preview the production build locally           |

Run the same quality gates used by deployment before opening a pull request:

```sh
npm run format:check
npm run check
npm run build
```

## Content and code structure

```text
src/
  components/             Reusable UI and metadata components
  content/projects/       Validated project case-study content
  data/                   Profile, experience, and skill data
  layouts/                Shared page shell
  pages/                  Static routes
  styles/                 Global styles and design tokens
public/
  assets/diagrams/        Evidence-based technical illustrations
  assets/projects/gymbo/  Reserved for approved, sanitized product media
  resume/                 Reserved for the optional public resume PDF
```

Update professional facts in the structured content layer, not directly in a visual component.
Read `AGENTS.md` before editing content. `CONTENT_SOURCES.md` maps public topics to source paths,
and `CONTENT_GAPS.md` records facts and assets that are not safe to publish yet.

The authoritative source is the read-only `main` branch of
`muammed1/career-knowledge-base`. Do not copy that private repository into this one.

## Resume replacement

The PDF is currently absent, so Resume links lead to the print-friendly `/resume/` page.

To add a verified general resume:

1. Confirm that it contains no confidential information, another company's name, or a
   company-specific footer.
2. Add it at exactly
   `public/resume/Mohammad_Zeno_Backend_Developer_Resume.pdf`.
3. Update the PDF-targeted Resume CTAs in `src/components/Header.astro`,
   `src/components/Hero.astro`, and `src/pages/projects/gymbo/index.astro` to
   `/resume/Mohammad_Zeno_Backend_Developer_Resume.pdf`.
4. Add `download` only to links whose purpose is explicitly downloading the file; keep
   `/resume/` available as the accessible HTML version.
5. Run the production build and verify both the HTML resume and PDF URL.
6. Remove the resolved entry from `CONTENT_GAPS.md`.

Never add an empty or generated placeholder PDF.

## Gymbo screenshot replacement

No real, sanitized product screenshots are currently available. The site intentionally uses
clearly labeled architecture/workflow illustrations and does not render fake interface images.

To add screenshots later:

1. Obtain written approval to publish each image.
2. Remove personal data, client names, credentials, device identifiers, financial records, and
   other sensitive operational data.
3. Export optimized WebP or AVIF files at useful responsive sizes.
4. Add them under `public/assets/projects/gymbo/` with descriptive filenames.
5. Register them in the structured Gymbo content source, including honest captions and
   descriptive alternative text.
6. Enable the screenshot UI only after every referenced file exists.
7. Check mobile and desktop rendering, accessibility, and the production build.

Do not label diagrams, mockups, or generated artwork as product screenshots.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` runs on pushes to `main` and by manual dispatch. It:

1. checks out the repository;
2. installs Node.js and the locked npm dependencies;
3. runs formatting, Astro/TypeScript, and build validation;
4. uploads `dist` as the GitHub Pages artifact;
5. deploys through the `github-pages` environment.

The workflow uses only the GitHub-provided token and the least Pages permissions; no repository
secret is required.

One manual repository setting is required:

1. Open **Settings → Pages** in `muammed1/muammed1.github.io`.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Ensure GitHub Actions are enabled for the repository.
4. After merging to `main`, inspect the workflow result and then verify
   `https://muammed1.github.io`.

Do not report the production site as deployed until both the workflow and live URL pass.

## Custom domain

The default and canonical site URL is `https://muammed1.github.io`. To use a custom domain:

1. Confirm the final domain and whether the apex or `www` form is canonical.
2. Update `site` in `astro.config.mjs`.
3. Add `public/CNAME` containing only the chosen domain.
4. Configure the current DNS records specified by GitHub Pages for that domain type.
5. In **Settings → Pages**, enter the same custom domain and complete domain verification.
6. Enable **Enforce HTTPS** when GitHub makes it available.
7. Update the host directive in `public/robots.txt`, then search the repository for the old host.
   Canonical, sitemap, and social metadata URLs derive from Astro's `site` setting; manifest paths
   are relative.
8. Rebuild and test both the custom domain and redirects.

Do not add `CNAME` or change canonical URLs before the domain and DNS ownership are confirmed.

## Maintenance workflow

1. Create a focused branch.
2. Re-read the relevant authoritative knowledge-base sources.
3. Update structured content and its path-level mapping in `CONTENT_SOURCES.md`.
4. Record or resolve uncertainty in `CONTENT_GAPS.md`.
5. Run the quality gates and inspect representative viewport sizes.
6. Review the diff for unsupported claims and accidental private material.
7. Open a pull request; deploy only after review and merge to `main`.

Important architectural rationale is recorded in `DESIGN_DECISIONS.md`.
