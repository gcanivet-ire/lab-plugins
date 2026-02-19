---
description: Generate a CMA for a target property using local comps and market context
argument-hint: "<target property address>"
---

Create a comparative market analysis (CMA) for the target property.

Before doing any analysis, read `${CLAUDE_PLUGIN_ROOT}/skills/cma/SKILL.md` and follow it as the source of truth for workflow, quality checks, and output format.

## Brand Compliance (Required)

Before generating any branded asset output, resolve and confirm the target brand.

1. Determine the brand from explicit user instruction first.
2. If not explicit, infer from available context (project/client/team details).
3. If ambiguous, conflicting, or low-confidence, ask a clarifying question and pause:
   - "Which brand should I use for this asset?"
4. Load and follow the selected brand guideline document if available.
5. If no guideline is available for the selected brand, ask the user for missing brand rules before finalizing.

Do not finalize a branded CMA until brand selection is confirmed.

## Required Inputs

- Target property address
- Property type (single-family, condo, townhouse, multi-family, land)
- Beds, baths, square footage
- Lot size (if applicable)
- Year built / condition / renovations (if known)
- Brand name/id for the deliverable (if not already clear)

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
   - Include a brief "Brand Applied" section noting selected brand and any assumptions.

## Output Requirements

- Keep the report clear and agent-facing.
- Always include:
  - Brand Applied (brand id/name, guideline source, unresolved brand assumptions)
  - Subject summary
  - Comps table
  - Market summary
  - Price recommendation
  - Confidence and risks
  - Suggested next steps for the listing conversation
