# Connectors

## How tool references work

Plugin files use `~~category` as a placeholder for whatever tool the user
connects in that category. For example, `~~CRM` might mean BoldTrail or
Follow Up Boss any other real estate CRM with an MCP server.

Plugins are tool-agnostic — they describe workflows in terms of categories
rather than specific products.

## Connectors for this plugin

| Category | Placeholder | Included servers | Other options |
|----------|-------------|-----------------|---------------|
| CRM | `~~CRM` | BoldTrail | Follow Up Boss, kvCORE, Sierra Interactive, Chime, Lofty |
| Back office | `~~back office` | BackOffice (by Inside Real Estate) | Brokermint, SkySlope, Dotloop, MoxiWorks |
| Chat | `~~chat` | — | Slack, Microsoft Teams |
| Calendar | `~~calendar` | — | Google Calendar, Outlook |

## Setup

### BoldTrail CRM (included)
Set the `BOLDTRAIL_API_KEY` environment variable with your BoldTrail API key.

### BackOffice (included)
Set the `BACKOFFICE_API_KEY` environment variable with your BackOffice API key.

### Chat & Calendar
These are optional. Connect your preferred chat and calendar tools through Cowork's connector settings to enable standup reports that include scheduled appointments and team channel activity.
