# Mohammad Zeno — Engineering Portfolio

A static, engineering-focused portfolio for Mohammad Zeno. It presents verified professional
experience, skills, education, and a substantial Gymbo case study without publishing private
source material or overstating incomplete evidence.

Canonical deployment target: `https://muammed1.github.io`

## Technology

- Astro
- strict TypeScript
- Astro content collections with schema validation
- Pages CMS as a Git-backed editing interface
- semantic HTML
- modern vanilla CSS with custom properties
- static SVG assets
- npm

The production site has no backend, database, analytics tracker, cookies, contact-form service,
or client-side UI framework. Pages CMS edits repository content; it is not shipped with the site.

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

| Command                    | Purpose                                        |
| -------------------------- | ---------------------------------------------- |
| `npm run dev`              | Start the local Astro development server       |
| `npm run validate:cms`     | Validate the Pages CMS configuration           |
| `npm run validate:content` | Validate managed media and file references     |
| `npm run format`           | Format supported files with Prettier           |
| `npm run format:check`     | Verify formatting without rewriting files      |
| `npm run check`            | Run Astro and TypeScript checks                |
| `npm run build`            | Validate and create the static site in `dist/` |
| `npm run preview`          | Preview the production build locally           |

Run the same quality gates used by deployment before opening a pull request:

```sh
npm run validate:content
npm run format:check
npm run check
npm run build
```

## Content and code structure

```text
src/
  components/             Reusable UI and metadata components
  content/site/           Profile, home, SEO, and site content
  content/experiences/    Editable professional experience entries
  content/skills/         Editable skill-group entries
  content/projects/       Editable project case studies and media
  layouts/                Shared page shell
  pages/                  Static routes
  styles/                 Global styles and design tokens
public/
  assets/diagrams/        Evidence-based technical illustrations
  resume/                 Optional public resume PDF uploads
```

Update professional facts in the structured content layer, not directly in a visual component.
Read `AGENTS.md` before editing content. `CONTENT_SOURCES.md` maps public topics to source paths,
and `CONTENT_GAPS.md` records facts and assets that are not safe to publish yet.

The authoritative source is the read-only `main` branch of
`muammed1/career-knowledge-base`. Do not copy that private repository into this one.

## Manage content without code

Routine content changes use the hosted [Pages CMS](https://app.pagescms.org) editor:

1. Sign in with GitHub and install the Pages CMS GitHub App for this repository only.
2. Open `muammed1/muammed1.github.io` on the `main` branch.
3. Edit profile, home, experience, skills, projects, images, or the resume PDF.
4. Keep a new project unpublished while reviewing it, then enable **Published** when ready.
5. Save. Pages CMS commits the files and the GitHub Pages workflow validates and deploys them.
6. Confirm the Actions run before treating the update as live.

The CMS labels and helper text are in Arabic while public site content remains English. Content
validation supports JPG, PNG, WebP, and AVIF up to 8 MB, and PDF resumes up to 15 MB. The hosted
Pages CMS currently has an
[open upload issue near 4.5 MB](https://github.com/pages-cms/pages-cms/issues/393), so keep direct
CMS uploads at 4 MB or less. For a larger valid file, use GitHub's **Add file → Upload files** UI
to place it in the matching media folder, then select it from Pages CMS. This fallback still needs
no code change or manual deployment. Every project image needs meaningful alternative text.
CMS-authored YAML and Markdown are excluded from cosmetic Prettier checks and remain protected by
Astro schemas and `validate:content`.

If validation fails, GitHub Pages keeps the last successful deployment live. Correct the content
in Pages CMS and save again. A new page type, field schema, visual layout, or site behavior still
requires a code change and pull request.

## Profile portrait

To add or replace the profile portrait without code:

1. Open **الملف الشخصي والسيرة** in Pages CMS.
2. Under **الصورة الشخصية**, upload a JPG, JPEG, PNG, WebP, or AVIF file no larger than 4 MB.
3. Enter a concise English description in **وصف الصورة** for screen-reader users.
4. Save and wait for the GitHub Pages workflow to complete.
5. Verify the home page on mobile and desktop. Removing the optional portrait restores the
   monogram fallback.

The build accepts portraits up to 8 MB. If the file is larger than 4 MB, upload it through
GitHub's **Add file → Upload files** into `src/content/profile/images`, then select it in Pages CMS
and save.

## Resume replacement

The PDF is currently absent, so Resume links lead to the print-friendly `/resume/` page.

To add a verified general resume:

1. Confirm that it contains no confidential information, another company's name, or a
   company-specific footer.
2. In Pages CMS, open **الملف الشخصي والسيرة**, upload a PDF up to 4 MB in the resume field, and
   save. For a PDF between 4 MB and 15 MB, upload it through GitHub's **Add file → Upload files**
   into `public/resume`, then select it in Pages CMS.
3. Keep `/resume/` available as the accessible HTML version.
4. Verify the new download link after the deployment succeeds.
5. Remove the resolved entry from `CONTENT_GAPS.md` in a normal documentation pull request.

Never add an empty or generated placeholder PDF.

## Gymbo screenshot replacement

No real, sanitized product screenshots are currently available. The site intentionally uses
clearly labeled architecture/workflow illustrations and does not render fake interface images.

To add screenshots later:

1. Obtain written approval to publish each image.
2. Remove personal data, client names, credentials, device identifiers, financial records, and
   other sensitive operational data.
3. In Pages CMS, open Gymbo and upload the approved images to its cover or gallery fields.
4. Add honest captions and descriptive alternative text.
5. Keep the project unpublished while checking mobile and desktop rendering and accessibility.
6. Publish only after the production build succeeds.

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

For routine, evidence-backed content and media edits, use Pages CMS on `main`. New projects start
unpublished, and every save is validated by the deployment workflow.

For code, layout, schema, workflow, or CMS-configuration changes:

1. Create a focused branch.
2. Re-read the relevant authoritative knowledge-base sources.
3. Update structured content and its path-level mapping in `CONTENT_SOURCES.md`.
4. Record or resolve uncertainty in `CONTENT_GAPS.md`.
5. Run the quality gates and inspect representative viewport sizes.
6. Review the diff for unsupported claims and accidental private material.
7. Open a pull request; deploy only after review and merge to `main`.

Important architectural rationale is recorded in `DESIGN_DECISIONS.md`.
