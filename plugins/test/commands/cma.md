---
description: Generate a CMA for a target property using local comps and market context
argument-hint: "<target property address>"
---

Create a comparative market analysis (CMA) for the target property.

Before doing any analysis, read `${CLAUDE_PLUGIN_ROOT}/skills/cma/SKILL.md` and follow it as the source of truth for workflow, quality checks, and output format.

## Required Inputs

- Target property address
- Property type (single-family, condo, townhouse, multi-family, land)
- Beds, baths, square footage
- Lot size (if applicable)
- Year built / condition / renovations (if known)

If key details are missing, ask concise follow-up questions before proceeding.

## Workflow

1. **Confirm subject property profile**
   - Verify address and core characteristics.
   - Note any uncertainty and assumptions.

2. **Collect comparables**
   - Pull sold comps first, then active and pending where available.
   - Prioritize nearby and recent comps; expand radius/time window only if needed.
   - Exclude non-comparable outliers.

3. **Adjust comp relevance**
   - Account for meaningful differences: size, condition, lot, amenities, age, and location quality.
   - Use directional, evidence-based adjustments. Avoid false precision.

4. **Analyze market context**
   - Evaluate local trend direction, inventory, days on market, and list-to-sale behavior.
   - Identify whether current conditions are favoring buyers, sellers, or balanced outcomes.

5. **Derive valuation and pricing strategy**
   - Produce:
     - Estimated value range
     - Recommended list price strategy (conservative / market / aggressive)
     - Confidence level (High/Medium/Low) with rationale

6. **Deliver final CMA output**
   - Follow the structured reporting format from the skill.
   - Include assumptions, exclusions, and data caveats.

## Output Requirements

- Keep the report clear and agent-facing.
- Always include:
  - Subject summary
  - Comps table
  - Market summary
  - Price recommendation
  - Confidence and risks
  - Suggested next steps for the listing conversation
