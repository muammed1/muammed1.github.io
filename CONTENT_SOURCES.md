# Content Sources

## Policy

`muammed1/career-knowledge-base` on `main` is the authoritative, read-only source for professional
facts. This file records concise path-level provenance only. It intentionally contains no copied
source documents, private notes, or long excerpts.

Every public career claim must remain within the scope of at least one source path below. A path
does not make every possible interpretation of a source safe to publish; the governance and
conflict files still control wording.

## Governance

| Use                                       | Source path in `muammed1/career-knowledge-base` |
| ----------------------------------------- | ----------------------------------------------- |
| Repository evidence and publication rules | `README.md`                                     |
| Source-of-truth and evidence hierarchy    | `00_SYSTEM/REPOSITORY_GOVERNANCE.md`            |
| Codex/content handling instructions       | `00_SYSTEM/CODEX_INSTRUCTIONS.md`               |
| Repository-wide conflicts                 | `00_SYSTEM/CONFLICTS_AND_UNCERTAINTIES.md`      |
| Change history and document currency      | `00_SYSTEM/CHANGELOG.md`                        |
| Project/source navigation                 | `00_SYSTEM/PROJECT_INDEX.md`                    |

## Profile and homepage

| Public topic                                                                    | Source path(s) in `muammed1/career-knowledge-base`                 |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Name, professional positioning, summary, public contact, location, availability | `01_PROFILE/01_MASTER_PROFILE.md`                                  |
| Professional and learning-stage skills                                          | `01_PROFILE/SKILLS.md`; `01_PROFILE/LEARNING.md`                   |
| Employment chronology, title, dates, and domains                                | `01_PROFILE/CAREER_TIMELINE.md`; `01_PROFILE/01_MASTER_PROFILE.md` |
| Supported professional outcomes                                                 | `01_PROFILE/ACHIEVEMENTS.md`                                       |
| Education and current status                                                    | `01_PROFILE/EDUCATION.md`                                          |
| Certifications, including absence or status limits                              | `01_PROFILE/CERTIFICATIONS.md`                                     |

## Gymbo case study

All paths below begin with
`02_PROJECTS/GYMBO_KNOWLEDGE_BASE_RESTRUCTURED/`.

| Public topic                                                                    | Source path(s)                                 |
| ------------------------------------------------------------------------------- | ---------------------------------------------- |
| Project boundary and document status                                            | `00_PROJECT_INDEX.md`; `01_OVERVIEW.md`        |
| High-level system structure                                                     | `02_ARCHITECTURE.md`                           |
| Project-specific technology statements                                          | `03_TECH_STACK.md`                             |
| Relational data and reporting model                                             | `04_DATABASE/DATABASE_OVERVIEW.md`             |
| Business workflows and historical correctness                                   | `05_BUSINESS/BUSINESS_RULES.md`                |
| Supported functional scope                                                      | `06_FEATURES/FEATURE_CATALOG.md`               |
| Dahua attendance integration and identity mapping                               | `07_INTEGRATIONS/HARDWARE_INTEGRATION.md`      |
| Deployment evidence and operational limits                                      | `08_OPERATIONS/DEPLOYMENT.md`                  |
| Monolith, ledger balance, price versioning, views, and polling decisions        | `09_ENGINEERING/ENGINEERING_DECISIONS.md`      |
| Consistency, reporting, latency, traceability, and resource challenges          | `09_ENGINEERING/TECHNICAL_CHALLENGES.md`       |
| Transactions, reporting views, polling, duplicate handling, and tradeoffs       | `09_ENGINEERING/SOLUTIONS_AND_TRADEOFFS.md`    |
| Individual-contribution evidence boundaries                                     | `10_CAREER/PROJECT_CONTRIBUTION_FACTS.md`      |
| Conservative system-design discussion                                           | `10_CAREER/SYSTEM_DESIGN_TALKING_POINTS.md`    |
| Adoption, screen/schema, RBAC, audit, accounting, and synchronization conflicts | `11_GOVERNANCE/CONFLICTS_AND_UNCERTAINTIES.md` |

## Visuals and resume

| Public surface                         | Provenance rule                                                                                                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gymbo system-context illustration      | Derived only from `02_ARCHITECTURE.md`, `06_FEATURES/FEATURE_CATALOG.md`, and `10_CAREER/SYSTEM_DESIGN_TALKING_POINTS.md`; it is labeled as an illustration, not a product screenshot                 |
| Attendance/reporting-flow illustration | Derived only from `07_INTEGRATIONS/HARDWARE_INTEGRATION.md`, `09_ENGINEERING/SOLUTIONS_AND_TRADEOFFS.md`, and `10_CAREER/SYSTEM_DESIGN_TALKING_POINTS.md`; timing guarantees are intentionally absent |
| HTML resume                            | Composed from the profile sources above and the conservative contribution boundaries in `10_CAREER/PROJECT_CONTRIBUTION_FACTS.md`                                                                     |
| Social preview and MZ monogram         | Original portfolio branding; no biographical or product-evidence claim                                                                                                                                |

## Update rule

When a source changes, review the corresponding structured data or content entry, this mapping,
and `CONTENT_GAPS.md` together. If a source remains ambiguous, omit the exact claim or use the
most conservative wording; never silently combine conflicting versions.
