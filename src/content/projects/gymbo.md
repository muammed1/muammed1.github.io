---
title: Gymbo
summary: A gym-management platform connecting operational, financial, reporting, and biometric-attendance workflows.
role: Documented engineering contribution
published: true
featured: true
order: 1
status: deployed
privacy: private
technologies:
  - Web application
  - Relational database
  - Dahua biometric devices
  - PDF and Excel reporting
capabilities:
  - Business workflow design
  - Ledger-based financial records
  - Relational database architecture
  - Operational and financial reporting
  - Biometric attendance-device integration
seo:
  title: Gymbo engineering case study
  description: A documentation-led case study of Gymbo's membership, financial, reporting, and Dahua biometric-attendance workflows.
---

> **Evidence policy:** This case study uses the most conservative wording supported by the
> available project documentation. Source code, a verified schema, production runbooks, and
> sanitized interface screenshots were not available for public inspection. The diagrams are
> original architecture and workflow illustrations—not product screenshots or a detailed ERD.

## Project overview

Gymbo is documented as a centralized web application for recurring gym operations: subscribers
and memberships, prices and payments, attendance, physical resources, and management reporting.

The available evidence describes an application in use while leaving its exact implementation
stack and production topology undocumented. The useful engineering story is therefore the way
business state moves through the system, not an unsupported framework or infrastructure label.

### What is documented

- Subscriber, subscription, pricing, finance, attendance, locker, trainer, dashboard, report, and
  permission concerns are described at a high level.
- Financial movements are represented as debit and credit records.
- Historical prices remain associated with the subscriptions that used them.
- Relational data and reporting views support operational screens and exports.
- Dahua biometric devices participate in the attendance workflow.

### What is not established

Language, framework, database engine, hosting, API contracts, deployment topology, and test
coverage are not claimed here.

## Business context

A gym-management system is more than a directory of members. A subscription carries a price at a
point in time; a charge changes the member's financial position; a payment changes it again; and
an attendance event must be associated with the correct internal person.

Gymbo's documented rules connect these concerns while preserving traceability. Rather than storing
only a mutable balance or replacing old prices, the system is described in terms of financial
movements and historical price versions.

1. **A subscription creates a debit record.** The charge contributes to a balance derived from
   ledger entries.
2. **A payment creates a credit record.** The new movement contributes to the same calculated
   balance.
3. **A price change creates historical separation.** Existing subscriptions retain their
   documented price version.

## Contribution boundary

Public-safe records support engineering involvement with the system. They do not provide enough
evidence to publish a more precise project title or assign individual features to one contributor.

Within that boundary, the documented work concerns business-rule clarity, historical data
correctness, relational reporting, and external-device integration. This page does not assign every
design decision solely to one person, and it avoids unsupported claims of sole authorship, team
leadership, or exclusive subsystem ownership.

## Functional scope

The documented surface spans daily administration, commercial records, physical resources, and
management information.

### Subscribers and memberships

Subscriber records, membership types, durations, and subscription management are part of the
described operational scope.

### Pricing history

Versioned pricing preserves the value attached to a historical subscription when the current offer
changes.

### Financial records

Debit and credit movements support a ledger-derived member balance.

### Attendance

Internal attendance records are synchronized from Dahua biometric-device logs.

### Resources and staff

Locker and trainer management are included in the documented operational scope.

### Decision support

Dashboards, reports, database views, and optional PDF or Excel export make operational information
available for management workflows.

These capabilities are described as implemented in narrative sources; code-level verification is
unavailable. Role-based permissions are documented only at a high level, without a publishable
permission matrix.

## System structure

The case-study material characterizes Gymbo as a modular monolithic web application. Operational
business functions run through an application layer, state is held in a relational database, and
reporting projections are provided through database views.

Dahua attendance synchronization is described behind a dedicated service layer. “Dedicated”
describes responsibility separation; it does not establish an independently deployed microservice.

![Gymbo system context: users access a web application that applies business rules and stores operational records in a relational database. Reporting views support dashboards and PDF or Excel exports. Dahua attendance devices connect through a dedicated integration service layer.](/assets/diagrams/gymbo-system-context.svg)

_High-level system context reconstructed from documented boundaries. Technology choices and
deployment topology are deliberately excluded._

> **Architecture boundary:** The evidence does not support microservices, Clean Architecture,
> Domain-Driven Design, or event-driven architecture labels.

## Data and reporting design

Project sources report a relational model with 23 tables and 15 database views. Those counts
provide scale context only: table names, columns, keys, constraints, indexes, and view definitions
are not available, so this page intentionally avoids a speculative ERD.

### Operational records

Operational records hold day-to-day state across subscriber, subscription, pricing, finance,
attendance, locker, trainer, and user or role domains.

### Reporting views

Report-oriented projections support screens and optional PDF or Excel output without redefining
operational state.

### Derived financial balance

Subscription debits and payment credits contribute traceable movements from which a balance is
calculated.

### Historical price integrity

Price versioning prevents a current-price update from rewriting the value associated with an
earlier subscription.

## Engineering decisions

The strongest documented decisions favor traceability, historical correctness, and explicit domain
safeguards.

### Derive balance from movements

Debit and credit events remain the source of the calculated balance instead of presenting a
balance as an unexplained mutable number. Refund, reversal, discount, and correction behavior is
undocumented.

### Version prices

The price context of an existing subscription remains intact when the current offer changes.
Version activation, locking, and manual overrides are undocumented.

### Persist attendance idempotently

First-or-create behavior means polling the same device event again should not create another
attendance record. The exact deduplication identity key is undocumented.

### Reject conflicting assignments

The sources describe rules preventing overlapping subscriptions and conflicting locker
assignments. Conditions, exception paths, and enforcement layers are unavailable.

## Biometric device integration

The documented flow reaches a Dahua device, polls its raw attendance logs, maps each device user to
an internal subscriber, persists the event idempotently, and evaluates or flags subscription
eligibility.

This is an identity and data-quality boundary as much as a hardware boundary: external identifiers
and repeated observations must resolve to stable internal records.

![Six-step attendance workflow: reach a Dahua device, poll raw logs, map the device user to an internal subscriber, persist the attendance record idempotently, evaluate subscription eligibility, and make the record available to reporting.](/assets/diagrams/gymbo-attendance-flow.svg)

_Attendance synchronization and reporting flow. Polling is documented; real-time delivery and
physical gate control are not._

> **Integration boundary:** Device models, protocol or SDK, authentication, polling schedule,
> retry strategy, clock synchronization, provisioning, network topology, and physical access
> control are undocumented.

## Challenges and trade-offs

The sources reveal practical tensions even where implementation details remain private.

| Engineering tension | Documented response | Known boundary |
| --- | --- | --- |
| The same device log may be observed again | First-or-create, idempotent persistence | Deduplication key and timestamp policy unavailable |
| A device identity differs from a business identity | Map the device user to an internal subscriber | Provisioning and mismatch recovery unavailable |
| Prices change while history must remain stable | Associate subscriptions with a price version | Activation and override rules unavailable |
| Operational storage and report reading have different needs | Use database views for reporting projections | View definitions and refresh behavior unavailable |
| Assignments can conflict across time or resources | Reject subscription overlap and locker conflicts | Validation and transaction boundaries unavailable |

## Results and current status

The credible result is a documented operational capability set; numerical impact and
infrastructure maturity are not inferred.

- **Supported — connected operational workflows.** The sources describe subscriber, membership,
  financial, attendance, resource, dashboard, and reporting capabilities in one system.
- **Partially documented — production status.** Materials describe deployed use, but no
  independently verifiable adoption metric or client inventory is presented here.
- **Undocumented — operational topology.** Hosting, environments, tenancy, release, rollback,
  backup, and recovery procedures are not available.
- **Not claimed — quality metrics.** No public performance, availability, traffic, security, or
  test-coverage guarantees are inferred.

## Privacy and source availability

The production interface and implementation remain private, so this portfolio distinguishes
evidence from illustration.

### What is shown

- Conservative summaries of documented capabilities.
- Original high-level architecture and workflow diagrams.
- Explicit limits wherever implementation evidence is absent.

### What is withheld or unavailable

- Private source code and proprietary implementation detail.
- Production data, client-sensitive information, and credentials.
- Unverified screenshots, detailed schema, and deployment topology.

No synthetic dashboard is presented as product evidence. If sanitized screenshots become
available, they can be added later with a clear caption and provenance. Until then, the diagrams
remain deliberately abstract and non-deceptive.

Deeper technical publication would require a verified schema or migrations, API contracts, device
documentation, operating runbooks, and a publishable contribution record.

## Related engineering skills

These are themes evidenced by the documentation, not a claim that every global profile skill or
technology was used in Gymbo.

- **Business-rule modeling:** Translate subscriptions, payments, eligibility, and conflicts into
  explicit behavior.
- **Relational data reasoning:** Separate durable operational state from report-oriented
  projections.
- **Historical correctness:** Preserve prior commercial meaning as current pricing changes.
- **Systems integration:** Map an external device identity into a consistent internal attendance
  record.
- **Idempotent ingestion:** Make repeated polling safe against duplicate event persistence.
- **Evidence-conscious communication:** Explain architecture without filling private or
  undocumented gaps with assumptions.
