# Lead Management Plugin

A plugin for researching and enriching CRM contacts so agents can approach each lead with better context, cleaner records, and actionable talking points.

## What it does

- **`/contact-enrichment` command** — Finds the latest CRM contact, researches public information, updates high-confidence fields, adds tags, and writes an enrichment note.
- **`contact-enrichment` skill** — Defines the enrichment workflow, confidence model, data-quality rules, privacy boundaries, and reporting format.

## Components

| Component | Name | Purpose |
|-----------|------|---------|
| Command | `/contact-enrichment` | Run end-to-end lead contact enrichment workflow |
| Skill | `contact-enrichment` | Guide search strategy, validation, tagging, and note quality |
| Connector category | `~~CRM` | Contact lookup, update, tags, and notes |
| Connector category | `~~back office` | Optional transaction context for qualification workflows |
| Connector category | `~~chat` | Optional collaboration updates |
| Connector category | `~~calendar` | Optional appointment and timeline context |

## Setup

### Required

- Connect a CRM in the `~~CRM` category that supports contact search/update/tag/note actions.
- If using included integrations, set:
  - `BOLDTRAIL_API_KEY`

### Optional

- `~~back office` connector for deeper transaction context.
- `~~chat` and `~~calendar` connectors for workflow context.

See `CONNECTORS.md` for connector mapping details.

## Usage

Run:

```bash
/contact-enrichment
```

The command will:

1. Retrieve the latest CRM contact.
2. Research public sources with confidence scoring.
3. Update CRM fields conservatively (high-confidence only).
4. Add evidence-based tags.
5. Write a concise enrichment summary note for agent handoff.

## Notes

- Do not overwrite trustworthy existing CRM data unless findings are clearly newer and more accurate.
- Keep enrichment privacy-safe and based on publicly available information only.
