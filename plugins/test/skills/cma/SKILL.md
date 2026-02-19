---
name: cma
description: "Build a comparative market analysis for a target property using sold, active, and pending comparables plus local market context."
---

# CMA Skill

Generate a practical, agent-ready comparative market analysis (CMA) for a target property.

The goal is not just to output numbers. The goal is to give a pricing narrative that is defensible in a listing conversation.

## Core Principles

1. **Comps drive the story**: Use truly comparable properties, not just nearby properties.
2. **Recency matters**: Prefer recent transactions before expanding time windows.
3. **Location hierarchy matters**: Same subdivision or micro-market beats broader radius.
4. **Condition matters**: Renovation level and effective age can outweigh square-foot similarity.
5. **Range over false precision**: Provide a value range and confidence, not one "magic" number.
6. **Explain the recommendation**: Show why pricing strategy fits current market behavior.

## Required Data

### Subject Property
- Full address
- Property type
- Beds, baths, living area (sq ft)
- Lot size (if relevant)
- Year built / effective age
- Condition and upgrades
- Parking / garage / HOA (if applicable)
- Special features (view, pool, ADU, corner lot, etc.)

### Comparable Data
- Sold properties (primary evidence)
- Active listings (competition)
- Pending/under contract (market pulse)
- Sale/list prices, DOM, concessions, and key features

### Market Context
- Inventory trend
- Median DOM trend
- List-to-sale trend
- Price trend by neighborhood/segment
- Seasonal effects

## Recommended Connector Categories

- `~~MLS` for listings, sold data, and listing details
- `~~public records` for ownership, prior sale, tax, and structural details
- `~~market stats` for trend metrics (DOM, inventory, median sale/list behavior)
- `~~maps` for proximity and micro-location checks
- `~~CRM` for client context and saved preferences (optional)

## Step-by-Step Workflow

### Step 1: Confirm Subject Profile

Validate the subject property details before comping. If critical fields are missing, ask follow-up questions immediately.

### Step 2: Build Comp Universe

Start with guardrails:

- Radius: 0.5-1.0 miles (expand only if needed)
- Recency: last 90-180 days for sold comps (expand to 12 months only when inventory is thin)
- Same property type and similar style
- Similar size, bed/bath count, and lot profile

Target:
- 3-6 sold comps
- 2-4 active/pending comps

### Step 3: Filter and Grade Comps

Grade each comp:
- **A**: highly similar and nearby
- **B**: acceptable with minor differences
- **C**: stretch comp, use only with caveats

Remove obvious outliers unless needed to explain edge scenarios.

### Step 4: Evaluate Adjustments

Apply directional adjustments for meaningful differences:
- Size
- Condition/renovation quality
- Lot utility
- Age/effective age
- Amenities (pool, view, garage, ADU, etc.)
- Micro-location factors (busy street, school boundary, walkability)

Do not fabricate exact dollar adjustments without evidence. It is acceptable to use weighted narrative adjustments when precision is not justified.

### Step 5: Assess Market Direction

Determine whether pricing pressure is:
- Upward (low inventory, fast DOM, strong list-to-sale)
- Neutral
- Downward (rising inventory, slower DOM, discounting)

Adjust strategy based on trend direction and velocity.

### Step 6: Build Valuation and Pricing Strategy

Return:
- **Estimated value range**
- **Recommended list strategy**:
  - Conservative (faster absorption)
  - Market-aligned (balanced)
  - Aspirational/aggressive (if support exists)
- **Expected absorption narrative** (likely buyer response and timeline)

### Step 7: Provide a Client-Ready Report

Use this output structure:

```markdown
## Comparative Market Analysis: [Subject Address]

### Subject Snapshot
- [Key property facts]

### Comparable Summary
| Type | Address | Dist | Date | Beds/Baths | Sq Ft | Price | DOM | Notes |
|------|---------|------|------|------------|-------|-------|-----|-------|
| Sold | ...     | ...  | ...  | ...        | ...   | ...   | ... | ...   |

### Market Conditions
- [Inventory / DOM / trend summary]

### Valuation
- Estimated value range: **$X - $Y**
- Recommended list strategy: **[Conservative / Market / Aggressive]**
- Suggested list price: **$Z**

### Confidence and Risks
- Confidence: **[High/Medium/Low]**
- Key risks/caveats: [data gaps, unusual property traits, market volatility]

### Recommended Next Steps
1. [Any additional data to gather]
2. [Listing prep recommendations]
3. [How to position pricing conversation with seller]
```

## Quality Checklist

Before finalizing:

- [ ] Subject profile is complete enough for analysis
- [ ] Sold comps are recent and relevant
- [ ] Active/pending comps reflect current competition
- [ ] Outliers are identified and handled explicitly
- [ ] Pricing recommendation is tied to evidence
- [ ] Confidence rating is justified
- [ ] Assumptions and data gaps are clearly disclosed

## Failure Modes to Avoid

- Using only active listings and skipping sold data
- Selecting comps outside neighborhood norms without noting limitations
- Ignoring condition/renovation differences
- Returning a single-point valuation with no confidence range
- Giving a price recommendation without market context
