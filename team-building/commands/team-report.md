---
description: Generate team performance reports (standup, weekly, monthly)
argument-hint: [standup | weekly | monthly]
---
Generate a real estate team leader report. The user may specify a report type or ask a general question about team performance.

## Determine Report Type

Based on the user's input ($ARGUMENTS), determine which report to generate:

- **standup** (or "morning", "daily", "today") — Morning standup prep report
- **weekly** (or "accountability", "scorecard") — Weekly accountability report
- **monthly** (or "production", "month") — Monthly production report

If no type is specified, ask which report the user wants.

## Load Domain Knowledge

Read the team-leadership skill for coaching frameworks and KPI benchmarks. Read `${CLAUDE_PLUGIN_ROOT}/skills/team-leadership/references/report-templates.md` for the report structure to follow.

## Gather Data

Pull data from the tools available:

1. **From ~~CRM**: Search contacts for recent leads (last 24 hours for standup, last 7 days for weekly, last 30 days for monthly). Check contact activity, notes, and tags. Look at listing views and market reports per contact.

2. **From ~~back office**: Pull transactions filtered by status (active, pending, closed). For weekly/monthly reports, include commission data and agent production. Check for overdue tasks and upcoming deadlines.

3. **From ~~chat** (if available): Check for any team channel updates or announcements relevant to the report period.

4. **From ~~calendar** (if available): Pull scheduled appointments, showings, and meetings for context.

## Generate the Report

Follow the corresponding template from `references/report-templates.md`:

- For **standup**: Focus on what happened overnight, what's critical today, and which agents need attention. Keep it scannable — the team leader will review this in 5 minutes.
- For **weekly**: Build the agent scorecard table with activity vs. goals. Highlight wins and coaching priorities. Include pipeline health.
- For **monthly**: Full production ranking, lead source analysis, transaction metrics, and recruiting status. This is the comprehensive view.

## Formatting Rules

- Use tables for agent comparisons and rankings
- Bold any numbers that are significantly above or below target
- Flag risk items clearly (e.g., "AT RISK" for deals with deadline issues)
- Include specific agent names from the data
- End with 2-3 actionable recommendations for the team leader

## Output

Present the report directly in the conversation. If the user asks, also offer to save it as a document.
