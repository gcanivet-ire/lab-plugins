# Connectors

## How tool references work

This plugin uses connector placeholders (`~~category`) so the workflow stays tool-agnostic.

## Connector categories for CMA

| Category | Placeholder | Purpose | Common options |
|----------|-------------|---------|----------------|
| MLS / Listings | `~~MLS` | Sold/active/pending comps, listing details, DOM, concessions | Local MLS feeds, Broker APIs |
| Public records | `~~public records` | Ownership, tax, prior sale, legal/structural details | County assessor, title/public record providers |
| Market statistics | `~~market stats` | Inventory trend, list-to-sale ratio, segment-level trends | Market analytics providers, brokerage BI |
| Mapping / geo | `~~maps` | Distance checks, micro-location analysis, boundary context | Google Maps, Mapbox, GIS services |
| CRM (optional) | `~~CRM` | Client profile, timeline, notes | BoldTrail, Follow Up Boss, kvCORE |

## Setup Notes

- At minimum, connect `~~MLS` and `~~market stats` to generate a usable CMA.
- Add `~~public records` for stronger subject property validation.
- Add `~~maps` for better proximity and micro-location confidence.
