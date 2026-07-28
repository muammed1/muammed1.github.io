# Design Decisions

## Astro

Astro was selected because the portfolio is content-led and benefits from build-time rendering,
typed content, reusable components, and minimal browser JavaScript. It supports the required
routes and metadata without introducing a client-side application framework.

## Static delivery

The site is fully static because it does not need authenticated runtime state, a database, or
server-side form handling. Static output is fast, has a small operational surface, and deploys
directly to GitHub Pages without secrets. Contact uses verified external links and `mailto:`.

## Git-backed content editing

Pages CMS provides an authenticated editing interface over the repository instead of adding a
runtime CMS or content database. Managed content remains reviewable, validated, versioned in Git,
and built by the same Astro and GitHub Pages pipeline. New projects default to unpublished so an
editor can save incomplete work without exposing a public route.

## Restrained visual system

The design uses a dark navy foundation, controlled cyan/teal accents, strong typography,
generous spacing, and modest borders. This keeps attention on engineering evidence, supports
clear hierarchy and contrast, and avoids visual devices that could imply expertise without
substance. Motion is optional, CSS-based, and disabled or reduced when the user requests reduced
motion.

## No fabricated screenshots

The Gymbo implementation is private and no sanitized production screenshots are available.
Fabricated dashboards would be deceptive, so the site uses clearly labeled system and workflow
illustrations derived from documented concepts. Screenshot UI stays hidden until real,
publication-approved assets exist.

## Content separated from components

Profile, page copy, experience, skills, and project material live in validated content
collections; components handle presentation. This makes factual review possible without searching
through layout markup, reduces duplicated claims, and allows the same files to be safely edited
through Pages CMS.

## Private knowledge base remains private

The authoritative career knowledge base contains more material than a public portfolio needs.
Copying it would increase privacy risk, expose internal uncertainty, and create a second source
of truth. This repository therefore stores only minimal public-safe content and path-level
provenance; it never mirrors private source documents.
