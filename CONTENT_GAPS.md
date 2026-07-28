# Content Gaps

This file tracks information and assets that are not currently safe or complete enough for
public claims. It is an editorial control, not public portfolio copy.

## Missing assets

### Public resume PDF

The following file is absent:

`public/resume/Mohammad_Zeno_Backend_Developer_Resume.pdf`

Until a verified general resume is supplied, all primary Resume CTAs must continue to lead to the
print-friendly `/resume/` page. Required owner input: a current, publication-approved PDF without
confidential information, another company's branding, or a company-specific footer.

### Sanitized Gymbo screenshots

No publication-approved production screenshots are available. Screenshot components must remain
hidden. The technical SVGs are labeled illustrations and must never be presented as product UI.

Required owner input:

- sanitized source images and written confirmation that each may be published;
- an honest caption and context for each image;
- confirmation that client names, personal data, credentials, device identifiers, financial
  records, and proprietary details have been removed.

Approved files should be added under `public/assets/projects/gymbo/`.

## Missing verified facts

The current sources do not establish enough evidence for the following:

- Mohammad's current public city/country; Aleppo is documented for the university, not as a
  current residence;
- exact Gymbo role, ownership boundaries, team size, dates, or complete individual authorship;
- code-level proof or commit history for attributed Gymbo implementation work;
- complete project-specific framework, database, version, frontend, infrastructure, and
  deployment details unless explicitly resolved in the project-specific source set;
- deployment method, installation work, support scope, and client-facing responsibilities;
- production scale, traffic, concurrency, reliability, recovery behavior, security
  implementation, test coverage, or measured performance;
- a complete schema/view/route inventory and definitions for what counts as a table or screen;
- the actual device idempotency key and duplicate/correction behavior;
- audit coverage, retention, immutability, and implementation mechanism;
- the accounting-domain evidence required to call the ledger formal double-entry accounting;
- decision dates, owners, rejected alternatives, measured outcomes, and rollback criteria.

Do not convert these gaps into implied accomplishments.

## Conflicts affecting public wording

All source paths below begin with
`02_PROJECTS/GYMBO_KNOWLEDGE_BASE_RESTRUCTURED/`.

| Topic                | Conflict                                                                                           | Public treatment                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Attendance timing    | The conflict register records periodic/asynchronous polling versus real-time/immediate wording     | Say device synchronization or periodic polling; make no real-time guarantee                          |
| Adoption             | The conflict register records three active clients versus 3+ facilities                            | Use “multiple real-world clients/facilities” only if needed; omit the exact count and unit           |
| Table classification | 16 of 23 tables are called operational in one source and system-specific in another                | Omit the 16-table classification pending a complete schema inventory                                 |
| Screen count         | 30+ conflicts with approximately 28–30 and 22 main post-login screens                              | Omit the count pending a route/screen inventory and definition                                       |
| RBAC scope           | Simple manager/accountant roles conflict with a broader granular role set                          | Describe only high-level role-based access; do not state a complete role or permission matrix        |
| Audit coverage       | Limited financial/subscription history conflicts with system-wide triggers and “every interaction” | Describe audit mechanisms only where narrowly supported; do not claim complete or immutable auditing |
| Accounting model     | “Double-entry principles” is not accompanied by balanced journal/account evidence                  | Describe debit/credit ledger records; do not call the model formal double-entry accounting           |

Authoritative conflict register:

`02_PROJECTS/GYMBO_KNOWLEDGE_BASE_RESTRUCTURED/11_GOVERNANCE/CONFLICTS_AND_UNCERTAINTIES.md`

## Claims intentionally omitted

The portfolio must omit these claims unless new authoritative evidence resolves them:

- exact client/facility or user counts;
- exact screen counts or the unresolved 16-table classification;
- sub-second reporting or any unsupported performance metric;
- real-time or immediate attendance synchronization;
- formal double-entry accounting;
- complete, system-wide, immutable, or interaction-level auditing;
- fraud-proof operation, tax compliance, complete security, or guaranteed physical-access
  denial;
- proven scalability, production traffic, uptime, or test coverage;
- unsupported cloud, AWS, Docker, Kubernetes, CI/CD, microservices, event-driven, DDD, or Clean
  Architecture claims;
- sole ownership, team leadership, or complete individual authorship;
- medical notes, guest passes, promotions, notifications, invoices, multiple payment channels,
  encryption, secure sessions, peak analytics, or other presentation-only features without
  higher-priority confirmation.

## Exact input needed to improve the portfolio

1. Supply the approved resume PDF at the exact path above.
2. Supply approved, sanitized Gymbo screenshots with captions and publication permission.
3. Confirm a current location and explicit permission to publish it, if a location should appear
   in the contact section.
4. Confirm Gymbo title, dates, team size, and individual contribution boundaries with durable
   evidence such as commit history or an owner-approved contribution record.
5. Supply a route/screen inventory and complete classified schema/view inventory.
6. Confirm client count, facility count, active status, evidence date, and the relationship
   between clients and facilities.
7. Supply scheduler/worker configuration and a measured device-to-application latency range.
8. Supply role/permission seeds and the application enforcement points.
9. Supply audit schema, triggers/listeners, event coverage, retention, and immutability evidence.
10. Supply ledger schema and posting rules reviewed by an accounting-domain specialist before any
    formal double-entry claim.
11. Supply project-specific deployment, infrastructure, test, security, and performance evidence
    before publishing related claims.

Resolved items should be removed only after the source mapping and public content are updated and
revalidated together.
