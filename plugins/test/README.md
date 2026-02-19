# Test Plugin

This plugin provides a `/cma` command to generate a comparative market analysis (CMA) for a target property.

## What it does

- Builds a subject property profile
- Selects and grades sold/active/pending comps
- Applies evidence-based adjustment reasoning
- Incorporates current market context
- Produces a value range, list strategy, and confidence rating

## Components

| Component | Name | Purpose |
|-----------|------|---------|
| Command | `/cma` | Generate CMA report for a target property |
| Skill | `cma` | Enforce workflow, quality standards, and reporting format |
| Connector mapping | `CONNECTORS.md` | Tool-agnostic connector categories for data inputs |

## Usage

```bash
/cma 123 Main St, Anytown, CA
```

If required details are missing, the command asks follow-up questions before analysis.
