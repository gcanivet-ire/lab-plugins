# CLAUDE.md — Lab Plugins Repository

## Project Overview

This is a **Claude AI Skills plugin marketplace** for real estate teams and agents, maintained by Inside Real Estate. The repository defines reusable AI workflows (skills) organized by real estate business domain. Plugins are documentation-only: no build system, no runtime, no compiled output.

**Active development branch**: `claude/add-claude-documentation-Wy6p1`

---

## Repository Structure

```
lab-plugins/
├── .claude-plugin/
│   └── marketplace.json          # Root plugin registry — single source of truth for all plugins
├── plugins/                      # One directory per plugin
│   ├── brand-guidelines/         # FEATURED: Brand selection and compliance
│   ├── client-buyer-tools/       # TEMPLATE stub
│   ├── client-offer-management/  # TEMPLATE stub
│   ├── client-presentation/      # FEATURED: CMA generation
│   ├── client-seller-tools/      # TEMPLATE stub
│   ├── lead-generation/          # TEMPLATE stub
│   ├── lead-management/          # FEATURED: Contact enrichment
│   ├── lead-nurture/             # TEMPLATE stub
│   ├── team-building/            # FEATURED: Team performance reports
│   ├── team-pipeline-management/ # TEMPLATE stub
│   ├── team-recruiting/          # TEMPLATE stub
│   ├── transaction-compliance/   # TEMPLATE stub
│   ├── transaction-coordination/ # TEMPLATE stub
│   └── transaction-post-close/   # TEMPLATE stub
├── reference-assets/
│   └── brand-guidelines/
│       ├── assets-elysian/       # PDFs: buyer/seller brand packets
│       └── assets-lepagejohnson/ # SVG/PNG/PDF logos
├── .gitignore                    # Excludes .DS_Store only
└── README.md                     # Minimal project descriptor
```

### Plugin Internal Structure (Fully Featured)

```
plugins/<plugin-name>/
├── .claude-plugin/
│   └── plugin.json               # Plugin manifest (name, version, description, author)
├── skills/
│   └── <skill-name>/
│       └── SKILL.md              # User-invocable or auto-invocable skill definition
├── CONNECTORS.md                 # Tool connector categories and env vars (optional)
└── README.md                     # Plugin setup and usage guide (optional)
```

---

## Plugin Architecture

### Marketplace Registry

The root `.claude-plugin/marketplace.json` is the authoritative registry. Every plugin must be listed here with:

```json
{
  "name": "plugin-id",
  "source": "./plugins/plugin-id",
  "description": "Brief purpose statement"
}
```

**When adding or renaming a plugin, update `marketplace.json` first.**

### Plugin Manifest (`plugin.json`)

Every plugin directory must contain `.claude-plugin/plugin.json`:

```json
{
  "name": "plugin-id",
  "version": "1.0.0",
  "description": "What this plugin does",
  "author": { "name": "Inside Real Estate" }
}
```

### Plugin States

- **FEATURED**: Has full implementation (skills, supporting docs)
- **TEMPLATE**: Has only `.claude-plugin/plugin.json` and `.gitkeep` placeholders — ready for expansion

---

## Document Conventions

### Skill Files (`SKILL.md`)

Skills are background knowledge documents that guide Claude's reasoning for a domain. Front matter followed by structured Markdown:

```yaml
---
name: skill-id
description: "When to trigger this skill — used for tool selection"
version: "1.0.0"
argument-hint: "[optional-argument]"       # omit if no user argument needed
user-invocable: false                      # omit (or set true) for user slash command
---

# Skill Title

## Purpose / Why This Matters
Brief rationale.

## Workflow Steps
Step-by-step numbered or bulleted guidance.

## Data Categories / Tables
Organize information in tables where helpful.

## Confidence Scoring
| Level | Definition |
|-------|------------|
| High  | ... |
| Medium| ... |
| Low   | ... |

## Edge Cases
Common failure modes and recovery strategies.

## Quality Checklist
- [ ] Item to verify before completion
```

**Mandatory sections**: Purpose, workflow steps, quality checklist, edge cases.

### Tool-Agnostic Placeholders

All skills reference tool categories — never specific product names:

| Placeholder | Examples |
|-------------|----------|
| `~~CRM` | BoldTrail, Follow Up Boss, kvCORE, Sierra Interactive, Chime, Lofty |
| `~~MLS` | Any MLS system |
| `~~back office` | BackOffice, Brokermint, SkySlope, Dotloop, MoxiWorks |
| `~~chat` | Slack, Microsoft Teams |
| `~~calendar` | Google Calendar, Outlook |

Use `${CLAUDE_PLUGIN_ROOT}` to reference plugin-local assets (brand files, templates) in skills.

---

## Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Plugin directories | kebab-case | `lead-management` |
| Plugin IDs (`name` field) | kebab-case | `lead-management` |
| Skill directories | kebab-case | `contact-enrichment` |
| Slash commands | `/plugin-name:skill-name` | `/lead-management:contact-enrichment` |
| Brand IDs | kebab-case | `lepagejohnson`, `elysian` |
| Template-only plugins | append `-empty` suffix in marketplace `name` | `lead-generation-empty` |

---

## Active Plugins Reference

### `brand-guidelines`
- **Entry**: Skill `brand-resolution` — always invoke before producing branded deliverables
- **Protocol**: Identify active brand → load guidelines file → verify compliance checklist
- **Brands**: `lepagejohnson` (Lepage Johnson), `elysian` (Elysian Homes)
- **Assets**: `/reference-assets/brand-guidelines/` (logos, buyer/seller packets)

### `lead-management`
- **Skill**: `contact-enrichment` (user-invocable as `/lead-management:contact-enrichment`) — full enrichment workflow including BoldTrail API execution, search strategies, confidence scoring, field mapping, tagging framework, and privacy limits
- **Compliance**: TCPA, CAN-SPAM, GDPR, PIPEDA — public data only, no scraped private data
- **Connectors**: `~~CRM` (required), `~~back office` (optional); see `CONNECTORS.md`
- **Env vars**: `BOLDTRAIL_API_KEY`, `BACKOFFICE_API_KEY` (optional)

### `client-presentation`
- **Skill**: `cma` (user-invocable as `/client-presentation:cma <target property address>`) — subject property validation, comp selection, pricing analysis, brand integration
- **Dependency**: Always runs `brand-guidelines/brand-resolution` before producing output

### `team-building`
- **Skills**:
  - `team-report` (user-invocable as `/team-building:team-report [standup|weekly|monthly]`) — generates standup, weekly, and monthly team performance reports
  - `team-leadership` (auto-invocable only) — 4-part 1-on-1 structure, ACE accountability model, agent development tiers
- **Supporting docs**: `kpi-formulas.md` (metric calculations), `report-templates.md` (report structures)

---

## Development Workflows

### Adding a New Plugin (From Template)

1. Create `plugins/<plugin-name>/` directory
2. Add `.claude-plugin/plugin.json` with the standard manifest
3. Add a `skills/` directory with subdirectories for each skill
4. Populate skills following document conventions above
5. Register the plugin in `.claude-plugin/marketplace.json`
6. Remove `.gitkeep` files from populated directories

### Adding a Skill to an Existing Plugin

1. Create `plugins/<plugin-name>/skills/<skill-name>/SKILL.md`
2. Write front matter (`name`, `description`, `version`; add `argument-hint` if user-invocable; add `user-invocable: false` if background-only)
3. Structure with mandatory sections: purpose, workflow, edge cases, quality checklist
4. Include confidence scoring table if the skill produces scored outputs

### Upgrading a Template Plugin to Featured

Template plugins have `plugin.json` only. To promote to featured:
1. Implement skills following existing featured plugins as patterns
2. Add `README.md` with setup and usage instructions
3. Add `CONNECTORS.md` if the plugin requires external tool integrations
4. Update the `name` in `marketplace.json` (remove `-empty` suffix if present)

---

## Quality Standards

### All Skills Must Include

- **Confidence scoring** when producing assessments (High/Medium/Low with definitions)
- **Quality checklist** as final section for pre-delivery verification
- **Edge cases section** documenting common failure modes and recovery
- **Privacy/compliance notes** wherever external data is sourced

### All Branded Outputs Must

- Invoke `brand-guidelines/brand-resolution` skill first
- Pass the brand compliance checklist before delivery
- Reference brand assets via `${CLAUDE_PLUGIN_ROOT}` paths, never hardcoded URLs

### Marketplace Integrity

- `marketplace.json` must stay in sync with actual `plugins/` directories
- Plugin `name` fields in `plugin.json` must match the directory name
- All plugins must have `version: "1.0.0"` until versioning policy is established
- Author must always be `{ "name": "Inside Real Estate" }`

---

## Git Conventions

- **Active feature branch**: `claude/add-claude-documentation-Wy6p1`
- **Main branch**: `main` (stable, reviewed changes only)
- Commit messages are imperative, lowercase, descriptive (e.g., `add brand-guidelines plugin to marketplace`)
- Push to `origin/<branch-name>` using `git push -u origin <branch-name>`
- `.gitignore` excludes `.DS_Store` — add other macOS/editor artifacts as needed

---

## No Build System

This repository has no:
- Package manager (`package.json`, `pyproject.toml`, `Gemfile`)
- Build step (`make`, `npm run build`, etc.)
- Test framework
- CI/CD pipelines
- Linting or formatting tools

All content is Markdown and JSON. Validation is manual: check that `marketplace.json` reflects the actual directory structure, and that all required sections exist in skill files.
