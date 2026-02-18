---
name: contact-enrichment
description: "Enrich real estate CRM contacts with publicly available information. Use when the user wants to research a lead, find more info about a contact, enrich a prospect, or prepare for a client conversation. Triggers on phrases like 'enrich', 'research this lead', 'what can you find about', 'prepare me for my call with', or 'look up this contact'."
---

# Contact Enrichment Skill

Turn bare-bones CRM contacts into rich, actionable profiles by gathering publicly available information from the web. The goal is to arm agents with real intel before their next conversation — not just data, but context.

## Why This Matters

A contact record with just a name and email is nearly useless. An enriched contact with company context, professional background, real estate intent signals, and conversation starters transforms cold outreach into warm, relevant engagement. The difference in conversion rates can be dramatic.

## Core Workflow

### Step 1: Identify the Contact

The user provides a name, email, phone, or contact ID. Locate them in the CRM.

- **By name/email**: Search the CRM for matches. If multiple results, show them and ask the user to confirm which one.
- **By ID**: Pull the contact directly.

Always retrieve the full existing record first. You need to know what's already there to avoid overwriting good data with worse data.

### Step 2: Build a Search Strategy

Effective enrichment requires multiple targeted searches, not one generic query. The strategy depends on what you already know.

**Minimum viable search set:**

| Search | When to use | Purpose |
|--------|-------------|---------|
| `"Full Name" city state` | Always (if location known) | Disambiguate common names |
| `"Full Name" site:linkedin.com` | Always | Professional profile, career history |
| `email domain` (e.g., `acmecorp.com`) | If non-personal email | Company research |
| `"Full Name" company-name` | If company known/discovered | Confirm identity, find role |
| `"Full Name" real estate buyer OR seller` | Real estate CRM context | Intent signals |

**Advanced searches (based on available data):**

| Search | When to use | Purpose |
|--------|-------------|---------|
| `"phone-number"` (area code research) | If only phone available | Geographic confirmation |
| `address "city, state"` | If address available | Property ownership verification |
| `"Full Name" site:twitter.com OR site:x.com` | Building social profile | Interests, engagement style |
| `"Full Name" site:facebook.com city` | If limited LinkedIn presence | Alternative social data |
| `"Full Name" interview OR podcast OR speaker` | For executive/public figures | Talking points, interests |
| `company-name funding OR acquisition OR news` | Company research | Conversation context |

### Step 3: Cross-Reference Everything

This is critical. The internet is full of people with the same name. Before recording any finding, verify it matches the person in your CRM using:

- **Geographic alignment**: Same city, state, region
- **Email domain match**: Company found matches email domain
- **Phone area code**: Matches location in profile
- **Timeline consistency**: Career dates align with apparent age
- **Cross-platform confirmation**: Same person appears on LinkedIn and company website

**Confidence scoring:**
- **High confidence**: 3+ corroborating data points
- **Medium confidence**: 2 corroborating data points
- **Low confidence**: 1 or no corroborating data points

Only update CRM fields with high-confidence data. Medium-confidence data goes in notes with appropriate caveats. Low-confidence data should be flagged for user review.

### Step 4: Data Categories to Collect

**Identity & Contact**
- Full legal name (middle name, maiden name if relevant)
- All phone numbers (personal, work, mobile)
- All email addresses
- Physical address (current and previous)
- Preferred communication method (if discoverable)

**Professional Profile**
- Current company and role
- Company size, industry, and what they do
- Years in current role
- Previous employers and roles
- LinkedIn URL
- Professional accomplishments, awards
- Board memberships, advisory roles

**Social & Web Presence**
- LinkedIn (primary)
- Twitter/X
- Facebook (if public/professional)
- Instagram (if public/professional)
- Personal website or blog
- YouTube or podcast appearances
- Published articles or interviews

**Real Estate Relevance** (industry-specific)
- Buyer or seller signals
- Recent property transactions (public records)
- Investment property indicators
- First-time buyer signals
- Relocation indicators
- Life event triggers (marriage, children, retirement)
- Mortgage pre-approval mentions

**Conversation Context**
- Hobbies and interests
- Alma mater
- Charitable involvement
- Sports teams/affiliations
- Pets
- Family context (if publicly shared)
- Recent news or achievements

### Step 5: Update the CRM

Map findings to CRM fields. The golden rule: **Never overwrite existing data unless you're certain your finding is more current and more accurate.**

**Standard field mappings:**

| Finding | CRM Field | Update Rule |
|---------|-----------|-------------|
| Company name | `company` | Update if empty or clearly outdated |
| Job title | `title` | Update if empty or clearly outdated |
| Work phone | `work_phone` | Add if empty, never overwrite |
| Mobile phone | `mobile_phone` | Add if empty, never overwrite |
| Street address | `address_street` | Update if empty |
| City | `address_city` | Update if empty |
| State/Province | `address_state` | Update if empty |
| ZIP/Postal code | `address_zip` | Update if empty |
| Secondary email | `secondary_email` | Add if discovered |
| LinkedIn URL | `linkedin` | Always update (often missing) |
| Twitter/X URL | `twitter` | Add if discovered |
| Contact type | `type` | Set if determinable (buyer/seller/investor) |
| Lead source | `lead_source` | Only if currently blank |

### Step 6: Add Meaningful Tags

Tags should reflect actionable intelligence, not just data presence.

**Always add:**
- `enriched` — Marks that research has been done
- `enriched-[date]` — Timestamp for freshness

**Add when applicable:**

| Category | Tags | Trigger |
|----------|------|---------|
| Intent | `buyer`, `seller`, `investor`, `renter`, `first-time-buyer` | Clear signals found |
| Timeline | `active-now`, `6-months`, `12-months`, `just-looking` | Timeline mentioned |
| Motivation | `relocation`, `upsizing`, `downsizing`, `divorce`, `estate` | Life event signals |
| Value | `high-net-worth`, `luxury`, `executive`, `investor-portfolio` | Financial indicators |
| Engagement | `linkedin-active`, `social-presence`, `thought-leader` | Online activity level |
| Quality | `verified-identity`, `unverified`, `conflicting-data` | Confidence level |
| Industry | `tech`, `finance`, `healthcare`, `legal`, `real-estate-pro` | Professional background |
| Research | `no-web-presence`, `common-name-ambiguous`, `needs-review` | Research challenges |

### Step 7: Create the Enrichment Note

The note is the most valuable output. It's what the agent will actually read before a call.

**Structure:**

```
CONTACT ENRICHMENT — [Date]
Confidence: [High/Medium/Low]

PROFESSIONAL SNAPSHOT
[Name] is [Title] at [Company], a [brief company description].
They've been in this role [duration] and previously [relevant career context].
LinkedIn: [URL]

REAL ESTATE CONTEXT
[Buyer/Seller/Investor signals]
[Property history if found]
[Timeline indicators]
[Motivation signals]

CONVERSATION STARTERS
- [Personal interest or hobby]
- [Recent achievement or news]
- [Shared connection or alma mater]
- [Local community involvement]

KEY TALKING POINTS
- [2-3 things the agent should know]
- [Potential pain points or needs]
- [Things to avoid or be sensitive about]

DATA CONFIDENCE NOTES
[Any caveats about data quality]
[Conflicting information found]
[Items needing verification]

SOURCES
- [URL 1]
- [URL 2]
- [URL 3]
```

Keep it scannable. An agent should be able to absorb the key points in 30 seconds.

---

## What to Collect

### High-Value Data Points

These have the highest impact on agent effectiveness:

1. **Current employer and role** — Basic rapport-building
2. **How long in role** — Stability indicator
3. **Real estate intent signals** — Core qualification
4. **Timeline urgency** — Prioritization
5. **Geographic intent** — Market focus
6. **Communication preferences** — Channel optimization
7. **Personal interests** — Conversation starters
8. **Recent life events** — Motivation context
9. **Social engagement style** — How to approach them
10. **Professional network** — Referral potential

### Signals That Indicate Intent

**Buying signals:**
- Recently sold a home (need somewhere to live)
- Lease expiring (mentioned on social)
- Job change to new city (relocation)
- Growing family (upsizing)
- Empty nester (downsizing)
- Recently married/partnered
- Asking about neighborhoods on social
- Following real estate accounts
- Attending open houses (agent intelligence)

**Selling signals:**
- Long tenure in current home (might be ready)
- Home improvement posts (preparing?)
- Job change (relocation trigger)
- Life transition posts (divorce, kids leaving)
- Complaints about current home/area
- Questions about home values
- Following home staging accounts

**Investment signals:**
- Multiple property ownership (public records)
- Business entity ownership
- Real estate content engagement
- Investment group membership
- Rental property discussions
- Tax strategy discussions

---

## What to Avoid

### Privacy & Ethics Boundaries

**Never collect or use:**
- Information from private social media (friends-only posts)
- Data requiring login to access
- Information about minors
- Health information (even if public)
- Financial information beyond what's in public records
- Relationship status speculation
- Religious or political affiliation (unless publicly, proudly shared)
- Information from data broker sites without consent
- Anything that feels "creepy" to know

**Never do:**
- Create fake profiles to access information
- Scrape data in violation of terms of service
- Store sensitive data in CRM notes
- Share enrichment data with third parties
- Use enrichment to discriminate on protected characteristics
- Make assumptions based on name, location, or demographics

### Data Quality Pitfalls

**Avoid these common mistakes:**

| Mistake | Why it's bad | Instead... |
|---------|--------------|------------|
| Wrong person (same name) | Pollutes record, damages credibility | Triple-verify with corroborating data |
| Outdated information | Embarrassing in conversation | Note the date you found info, look for recent confirmation |
| Overwriting good data | Loses agent's local knowledge | Only fill empty fields, put findings in notes |
| Over-tagging | Noise obscures signal | Only add tags with clear supporting evidence |
| Speculation as fact | Creates false confidence | Clearly label uncertain findings |
| Single-source data | High error rate | Corroborate across sources |
| Ignoring cultural context | Names, titles vary by culture | Research naming conventions if unsure |

### Technical Pitfalls

**Search failures:**
- Very common names with no unique identifiers — Ask user for more context
- No online presence at all — Document as `no-web-presence`, still valuable info
- Conflicting information across sources — Note all versions, flag for user
- Rate limiting or blocked requests — Space out searches, try alternatives
- Paywalled content — Note the source exists, don't circumvent

**CRM integration issues:**
- Field character limits — Truncate intelligently, put full text in notes
- Required field formats — Validate before updating (phone formats, etc.)
- Tag limits — Prioritize highest-value tags
- Note size limits — Create multiple notes if needed, or summarize

---

## Edge Cases

### Common Name Problem

**Scenario**: "John Smith" in "Texas" returns thousands of results.

**Solution**:
1. Use every available data point (email domain, phone area code, zip code)
2. Search for unique combinations: `"John Smith" [email domain] [city]`
3. If still ambiguous, report back: "I found 3 possible matches for John Smith. Can you confirm which one?" and show distinguishing details
4. Add `common-name-ambiguous` tag if proceeding with partial confidence

### No Online Presence

**Scenario**: Searches return nothing useful.

**Solution**:
1. Document the finding — no presence is still data
2. Add `no-web-presence` tag
3. Check if email domain has a company website with employee directory
4. Try variations (nicknames, maiden names if known)
5. Note: "Limited online presence. Recommend asking about professional background directly."

### Conflicting Information

**Scenario**: LinkedIn says they work at Company A, but email domain is Company B.

**Solution**:
1. Don't assume either is correct
2. Document both in the enrichment note
3. Add `conflicting-data` tag
4. Suggest verification: "LinkedIn shows [A], email suggests [B]. Worth confirming current role."
5. Check dates — LinkedIn might be outdated

### Already Enriched

**Scenario**: Contact already has company, title, phone, address.

**Solution**:
1. Don't re-search for what you already have
2. Focus on new value: conversation starters, recent news, social presence
3. Verify existing data is current
4. Update the enrichment date
5. Add any missing tags based on existing data

### High-Profile Individual

**Scenario**: The contact is a known public figure (executive, politician, celebrity).

**Solution**:
1. More information is available, but also more noise
2. Focus on recent, relevant information
3. Look for personal interests that aren't obvious
4. Note any sensitivities (controversial topics to avoid)
5. Higher bar for accuracy — more reputational risk if wrong

### International Contacts

**Scenario**: Contact is in a non-US market with different data availability.

**Solution**:
1. Adjust expectations — some countries have less public data
2. Use country-specific platforms (Xing in Germany, Viadeo in France, etc.)
3. Be aware of stricter privacy laws (GDPR, PIPEDA, etc.)
4. Note the limitations in your enrichment summary
5. Cultural sensitivity around what's appropriate to research

---

## Quality Checklist

Before completing an enrichment, verify:

- [ ] **Identity confirmed** — 3+ corroborating data points?
- [ ] **Sources documented** — Can findings be traced back?
- [ ] **Confidence rated** — High/Medium/Low clearly stated?
- [ ] **No overwrites** — Existing CRM data preserved?
- [ ] **Tags justified** — Each tag has supporting evidence?
- [ ] **Note scannable** — Agent can absorb in 30 seconds?
- [ ] **Conversation value** — At least 2 talking points found?
- [ ] **Privacy respected** — Nothing creepy or sensitive stored?
- [ ] **Freshness noted** — Date of enrichment recorded?
- [ ] **Gaps acknowledged** — What wasn't found is documented?

---

## Reporting Back to User

After enrichment, provide a clear summary:

```
## Enrichment Complete: [Contact Name]

**Confidence**: [High/Medium/Low]

**Updated Fields:**
- Company: [value] — was empty
- Title: [value] — was empty
- LinkedIn: [URL] — was empty

**Tags Added:**
enriched, buyer, tech, verified-identity

**Key Findings:**
[2-3 sentences of the most important discoveries]

**Conversation Starters:**
- [Interest 1]
- [Interest 2]

**Gaps/Caveats:**
- [Anything you couldn't find or verify]

**Enrichment note added to CRM with full details.**
```

---

## Compliance Considerations

### United States
- **TCPA**: Phone data usage for calling/texting has strict rules
- **CAN-SPAM**: Email usage for marketing has requirements
- **State privacy laws**: CA, VA, CO, etc. have varying requirements
- **Fair Housing**: Never use enrichment data to discriminate on protected characteristics

### Canada
- **PIPEDA**: Personal information requires consent for collection and use
- **CASL**: Anti-spam legislation for electronic communications
- **Provincial laws**: Quebec, BC, Alberta have additional requirements

### Europe
- **GDPR**: Strict consent and purpose limitation requirements
- **Right to be forgotten**: Must honor deletion requests
- **Data minimization**: Only collect what's necessary

### Best Practice
- Only collect publicly available information
- Document the legitimate interest for enrichment (improve service to client)
- Allow contacts to see what you have on them if requested
- Delete enrichment data if relationship ends
- Never use enrichment for discriminatory purposes

---

## Integration Notes

This skill works best when combined with:

- **CRM API access**: To read/write contact records
- **Web search**: To gather public information
- **Property records API**: For ownership verification (where available)
- **Social platform APIs**: For structured social data (where permitted)
- **Company data APIs**: For firmographic enrichment (Clearbit, ZoomInfo, etc.)

If API access to data providers is available, prefer structured data over web scraping. It's more reliable and typically has clearer compliance posture.
