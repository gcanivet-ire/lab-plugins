---
name: brand-resolution
description: >
  Use when creating branded real estate deliverables: CMAs, presentations,
  listing materials, buyer/seller packets, or any asset that must match a
  specific brand. Triggers on "brand", "which brand", "lepage johnson",
  "elysian", brand guidelines, or when the user asks to create a branded
  document. Also use when commands like /cma require brand compliance.
version: 1.0.0
---

# Brand Resolution Skill

Authoritative source for resolving brand selection and loading brand guidelines across all plugins that produce branded real estate deliverables.

## Brand Resolution Protocol

Before finalizing any branded asset (CMA, presentation, listing materials, etc.):

1. **Explicit user input first** — Check for `brand`, team name, or direct instruction.
2. **Context signals** — Infer from client/team context, project naming, or prior confirmed brand.
3. **Available guideline files** — Use the guideline documents in this plugin when the brand matches.

If brand remains ambiguous, conflicting, or low-confidence, ask and pause:
- "Which brand should I use for this asset?"

**Never finalize branded output without confirmed brand selection.**

## Available Brands and Guideline Paths

This plugin provides guideline documents for the following brands. Load the corresponding file when that brand is selected:

| Brand id | Display name | Guideline file |
|----------|--------------|----------------|
| `lepagejohnson` | Lepage Johnson | `${CLAUDE_PLUGIN_ROOT}/lepagejohnson-guidelines.md` |
| `elysian` | Elysian Homes | `${CLAUDE_PLUGIN_ROOT}/elysian-guidelines.md` |

**Aliases to recognize:**
- Lepage Johnson: `lepage johnson`, `lepage-johnson`, `lj`
- Elysian: `elysian`, `elysian homes`, `elysian homes ny`

## Workflow for Branded Assets

1. **Resolve brand** — Use the Brand Resolution Protocol above.
2. **Load the guideline** — Read the guideline file for the selected brand from the table above.
3. **Apply the rules** — Follow logo, color, typography, tone, and layout rules from that guideline.
4. **Handle gaps** — If required brand specs are missing, ask the user before final delivery. Do not invent missing brand rules.
5. **Compliance gate** — Before finalizing, confirm:
   - Brand selected and confirmed
   - Guideline source used
   - Required style rules applied
   - Unresolved brand assumptions disclosed

## Brand Compliance Gate

Before finalizing any branded deliverable, verify:

- [ ] Brand selected and confirmed
- [ ] Guideline document loaded and applied
- [ ] Logo/color/typography rules followed (or user-approved overrides)
- [ ] Tone matches brand voice
- [ ] Any missing specs are flagged or confirmed with user
- [ ] "Brand Applied" section included in output (brand id, guideline source, caveats)

## Integration with Other Plugins

Commands like `/cma` (client-presentation) and other branded-asset commands should:

1. Load this brand-resolution skill when brand compliance is required.
2. Use the Brand Resolution Protocol to confirm brand before proceeding.
3. Load the appropriate guideline file from this plugin using the paths above.
4. Include a "Brand Applied" section in the final output.

If this plugin is not installed, commands should ask the user for brand name and key style rules before finalizing.
