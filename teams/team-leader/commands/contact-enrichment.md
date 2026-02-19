---
description: Enrich the latest BoldTrail CRM contact with web research and update their record
argument-hint: ""
---

Enrich the most recently created contact in BoldTrail CRM by researching them online, updating their record with discovered details, and adding a succinct note about their real estate motivations.

## Load Domain Knowledge

Read the contact enrichment skill at `${CLAUDE_PLUGIN_ROOT}/skills/contact-enrichment/SKILL.md` for the full enrichment workflow, including search strategies, confidence scoring, field mappings, tagging conventions, intent signal detection, edge case handling, privacy boundaries, and the quality checklist. Follow the skill's guidance closely throughout execution.

## Step 1: Retrieve the Latest Contact

Use `boldtrail_search_contacts` to find the most recently created contact. Set `per_page` to 1 and sort by most recent creation. Pull the full record using `boldtrail_get_contact` with the returned contact_id.

Inventory every field — note what's populated and what's empty. You will only fill gaps, never overwrite good data unless yours is clearly more current.

## Step 2: Research the Contact

Follow the skill's **Build a Search Strategy** section. Run the minimum viable search set first, then advanced searches as warranted:

**Minimum viable searches:**
1. `"Full Name" city state` — disambiguate common names
2. `"Full Name" site:linkedin.com` — professional profile
3. Email domain search (e.g., `acmecorp.com`) — company research
4. `"Full Name" company-name` — confirm identity and role
5. `"Full Name" real estate buyer OR seller` — intent signals

**Advanced searches (as data allows):**
6. Phone area code research — geographic confirmation
7. `"Full Name" site:twitter.com OR site:x.com` — social presence
8. `"Full Name" interview OR podcast OR speaker` — talking points for executives
9. `company-name funding OR acquisition OR news` — conversation context

**Cross-reference everything** per the skill's guidance. Apply confidence scoring:
- **High confidence** (3+ corroborating data points): Update CRM fields directly
- **Medium confidence** (2 data points): Include in notes with caveats
- **Low confidence** (1 or none): Flag for user review, do not update fields

Collect data across all categories from the skill: Identity & Contact, Professional Profile, Social & Web Presence, Real Estate Relevance, and Conversation Context.

## Step 3: Update the BoldTrail Contact Record

Use `boldtrail_update_contact` to fill in fields per the skill's **Standard field mappings** table. Only update with high-confidence data:

| Finding | CRM Field | Rule |
|---------|-----------|------|
| Company name | `company` | Update if empty or clearly outdated |
| Job title | `title` | Update if empty or clearly outdated |
| Work phone | `work_phone` | Add if empty, never overwrite |
| Mobile phone | `mobile_phone` | Add if empty, never overwrite |
| Street address | `address_street` | Update if empty |
| City | `address_city` | Update if empty |
| State/Province | `address_state` | Update if empty |
| ZIP/Postal code | `address_zip` | Update if empty |
| LinkedIn URL | `linkedin` | Always update (often missing) |
| Twitter/X URL | `twitter` | Add if discovered |
| Contact type | `type` | Set if determinable (buyer/seller/investor) |
| Lead source | `lead_source` | Only if currently blank |

**Golden rule**: Never overwrite existing data unless what you found is clearly more current and accurate.

## Step 4: Add Tags

Use `boldtrail_add_contact_tags` per the skill's tagging framework. Always add `enriched`. Then add from these categories only when genuinely supported by findings:

- **Intent**: `buyer`, `seller`, `investor`, `renter`, `first-time-buyer`
- **Timeline**: `active-now`, `6-months`, `12-months`, `just-looking`
- **Motivation**: `relocation`, `upsizing`, `downsizing`
- **Value**: `high-net-worth`, `luxury`, `executive`, `investor-portfolio`
- **Engagement**: `linkedin-active`, `social-presence`, `has-linkedin`, `has-website`
- **Quality**: `verified-identity`, `unverified`, `conflicting-data`
- **Industry**: `tech`, `finance`, `healthcare`, `legal`, `real-estate-pro`
- **Research**: `no-web-presence`, `common-name-ambiguous`, `needs-review`

Do not guess. Every tag must have supporting evidence.

## Step 5: Add an Enrichment Note

Use `boldtrail_add_contact_note` to create a note on the contact record. This is the most valuable output — it's what the agent reads before a call.

- **Title**: `Lead Enrichment Summary — [Today's Date]`
- **Details**: A succinct summary **under 500 characters** focused on decipherable real estate motivations or desires. Prioritize: buying/selling signals, property interests, investment activity, life events suggesting real estate intent (relocation, new job, growing family), timeline urgency, and 1-2 conversation starters. An agent should be able to scan this in 10 seconds and know how to approach the call.

## Step 6: Run the Quality Checklist

Before reporting back, verify per the skill's **Quality Checklist**:
- Identity confirmed with 3+ corroborating data points?
- Sources documented?
- Confidence rated (High/Medium/Low)?
- No existing CRM data overwritten?
- Every tag has supporting evidence?
- Note is scannable in 30 seconds?
- At least 2 conversation starters found?
- Privacy boundaries respected?
- Enrichment date recorded?
- Gaps acknowledged?

## Step 7: Report Back

Provide a clear summary following the skill's **Reporting Back** format:
- **Confidence level**: High/Medium/Low
- **Updated fields**: List each field changed and its new value
- **Tags added**: List all tags with brief justification
- **Key findings**: 2-3 sentences of the most important discoveries
- **Conversation starters**: At least 2 personal talking points
- **Gaps/caveats**: Anything not found, not verified, or conflicting
- Confirm the enrichment note was added to the CRM
