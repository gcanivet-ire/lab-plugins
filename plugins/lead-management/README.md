# Team Leader Plugin

A plugin for real estate team leaders to manage agent performance, track leads and transactions, run coaching conversations, and generate team reports.

## What it does

- **`/team-leader`** command — Generate morning standup, weekly accountability, or monthly production reports by pulling data from your CRM and back office
- **Team leadership skill** — Provides coaching frameworks (1-on-1 structures, accountability conversations), KPI benchmarks, lead management rules, transaction oversight checklists, and recruiting/onboarding guides

## Components

| Component | Name | Purpose |
|-----------|------|---------|
| Command | `/team-leader` | Generate standup, weekly, or monthly team reports |
| Skill | `team-leadership` | Real estate team management knowledge and coaching frameworks |
| MCP Server | BoldTrail | CRM data — contacts, leads, activity, listing views |
| MCP Server | BackOffice | Transactions, commissions, tasks, compliance |

## Setup

### Required

Set these environment variables for the bundled MCP servers:

- `BOLDTRAIL_API_KEY` — Your BoldTrail API key
- `BACKOFFICE_API_KEY` — Your BackOffice API key

### Optional

Connect chat (Slack, Teams) and calendar (Google Calendar, Outlook) through Cowork's connector settings for richer standup reports.

## Usage

### Generate a report

```
/team-leader standup    — Morning standup prep
/team-leader weekly     — Weekly accountability scorecard
/team-leader monthly    — Monthly production summary
```

### Ask about team management

The skill activates automatically when you ask about coaching, performance metrics, lead distribution, transaction oversight, or recruiting. Examples:

- "How should I handle a 1-on-1 with an underperforming agent?"
- "What's a good lead-to-appointment conversion rate?"
- "Help me build a 90-day onboarding plan for a new agent"

## Customization

This plugin is tool-agnostic. See `CONNECTORS.md` for details on swapping BoldTrail and BackOffice for other CRM and back office tools.

## License

MIT
