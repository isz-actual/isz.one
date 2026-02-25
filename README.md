# Signals Engine

**Operational infrastructure for the Northern Signal brand ecosystem.**

Maintained by Tim Reed, CPP | Director of Security | Author, *Signals in the Noise*

---

## Overview

Signals Engine is the backend infrastructure that powers the Northern Signal content and automation ecosystem. This repository contains workflow automations, content templates, publishing scripts, prompt libraries, and configuration files used across the following brands and platforms:

- **Northern Signal** — AI and security newsletter (Beehiiv)
- **Ice Station Zebra** — Custom coins, pins, patches, and merchandise (Shopify)
- **The Reed Group** — Consulting and governance advisory
- **ISZ Press** — Publishing imprint for *Signals in the Noise* and future titles

This is a public working repository. It is not a public product. It documents operational systems, preserves institutional knowledge, and provides version-controlled recovery paths for all critical automations.

---

## Repository Structure

```
signals-engine/
├── automation/
│   ├── make-workflows/        # Exported Make.com scenario JSON files
│   └── webhooks/              # Webhook handlers and endpoint configurations
├── content/
│   ├── templates/             # Reusable post, email, and newsletter templates
│   └── prompts/               # Refined Claude and AI prompt library
├── config/                    # Platform configuration files (non-sensitive)
├── docs/                      # Reference documentation and system notes
│   └── CHANGELOG.md           # Running log of major changes
├── scripts/                   # Utility scripts for publishing, data, and outreach
├── .env.example               # Environment variable template (no live credentials)
├── .gitignore                 # Files excluded from version control
└── README.md                  # This file
```

---

## Platform Coverage

| Platform     | Purpose                              | Folder               |
|--------------|--------------------------------------|----------------------|
| Make.com     | Workflow automation                  | automation/make-workflows |
| Beehiiv      | Newsletter delivery and segmentation | content/templates    |
| Shopify      | ISZ merchandise storefront           | config/              |
| HubSpot      | CRM and outreach sequences           | automation/          |
| Amazon KDP   | Book distribution scripts            | scripts/             |
| LinkedIn     | Content scheduling templates         | content/templates    |

---

## Security and Credential Policy

**No credentials, API keys, tokens, or passwords are stored in this repository.**

All sensitive values are managed via environment variables. See `.env.example` for the full list of required variables. Store your live `.env` file locally and never commit it.

If you discover a committed credential in the history of this repo, treat it as compromised and rotate it immediately.

---

## Versioning and Commit Standards

This repository follows a simple commit message convention:

```
[area] short description of what changed

Examples:
[make] updated order confirmation webhook for ISZ Shopify
[content] added Q2 LinkedIn cadence templates
[prompts] refined book outreach sequence for CPP audience
[config] updated Beehiiv segment tags
[docs] added HubSpot integration notes
```

Commits should be specific enough to reconstruct what changed and why. Vague messages like "update" or "fix" are not acceptable.

---

## Branching Convention

| Branch         | Purpose                                      |
|----------------|----------------------------------------------|
| `main`         | Stable, working version of all systems       |
| `dev`          | Active development and testing               |
| `feature/name` | Isolated work on a specific new capability   |
| `fix/name`     | Targeted repairs to existing functionality   |

Merge to `main` only when tested and verified. Delete feature branches after merging.

---

## Changelog

See [docs/CHANGELOG.md](docs/CHANGELOG.md) for a running log of significant changes, integrations added, and systems retired.

---

## Contact and Ownership

All content, frameworks, and systems in this repository are the intellectual property of Timothy E. Reed and associated entities. Unauthorized reproduction or distribution is prohibited.

For questions or collaboration inquiries: tim.reed@isz.one

---

*Last updated: February 2026*
