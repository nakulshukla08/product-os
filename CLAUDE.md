# Product OS — Agent Interaction Guide

Product OS is **built for agents, by agents**. It is the ultimate source of truth for product knowledge. Agents get context from this repo and **update it as the product evolves**. Humans stay aware and review; agents do the heavy lifting. Kill the drift.

- **Agents read** — Load Product OS before implementing or scoping work.
- **Agents write** — Update Product OS when code ships. Create PRs.
- **Augment, don't replace** — Jira, Linear, and other tools augment Product OS. We don't eliminate them.

**Full workflow**: See [content/about-product-os/agent-workflow.mdx](content/about-product-os/agent-workflow.mdx) for context preparation, when to read/update, and automation.

## Data Sources (Machine-Readable)

### Primary Data Files

| File | Purpose | Use For |
|------|---------|---------|
| `data/features/*.yaml` | Feature registry (per domain) with status, priority, completion, goal_ids, links | Feature status reports, gap analysis |
| `data/schema.yaml` | Unified schema: entity structures (goals, features, OKRs) + domains | Structure reference for agents |
| `data/backlog.yaml` | Prioritized backlog with ICE scores, goal_ids, links | What to build next, prioritization |
| `data/goals.yaml` | Strategic goals (OKRs) with status active/accomplished | Goal tracking, feature/backlog mapping |
| `data/repositories.yaml` | Repo map, tech stack, ownership | Architecture overview, dependency mapping |
| `data/research-sources.yaml` | Cited sources for research | Fact-checking, traceability |
| `data/roadmap.yaml` | Timeline-based roadmap | Timeline alignment |

### How to Read Data

1. **Features:** Read `data/schema.yaml` for domain→file mapping, then parse each `data/features/{domain}.yaml` for the full feature list. Each feature has `id`, `name`, `status`, `priority`, `completion`, `repos`, `goal_ids`, `links`.
2. **Backlog:** Parse `data/backlog.yaml` for ordered items. ICE scores (impact, confidence, ease) indicate priority. Items may have `goal_ids` and `links`.
3. **Goals:** Parse `data/goals.yaml` for strategic goals. Use `goal_ids` on features/backlog to map work to goals. Mark goals `accomplished` when done.
3. **Research:** Parse `data/research-sources.yaml` for cited sources. Reference by `id` in research reports.

## Content Structure

- **Product** — Vision, pitch, value prop, target audience
- **Features** — Per-feature MDX pages + `data/features/*.yaml` (per domain)
- **Architecture** — Repo map, tech stack
- **Backlog** — Prioritization framework + `data/backlog.yaml` + per-item pages
- **Research** — Market, competitors, technology (with sources)
- **Decisions** — PDR/ADR format
- **Metrics** — KPIs, benchmarks

## Frontmatter Convention

Every MDX file has YAML frontmatter. Key fields:

```yaml
title: "Page Title"
category: feature | product | backlog-item | research | decision | metrics
status: planned | in-progress | shipped | deprecated  # for features/backlog
priority: P0 | P1 | P2 | P3
owners: ["repo-1", "repo-2"]  # for features
last_updated: YYYY-MM-DD
tags: []
```

## Making Recommendations

When asked "what should we build next?" or similar:

1. Read `data/backlog.yaml` — items are pre-prioritized by ICE
2. Read `data/features/*.yaml` — identify gaps (low completion, blocked features)
3. Read `content/research/` — market and competitor context
4. Read `content/decisions/` — past decisions and rationale
5. Output: Prioritized list with reasoning, referencing specific data

## Adding Content

- Use templates in `templates/` for new pages
- Update both the MDX file and the corresponding `data/*.yaml` when changing feature/backlog status
- Add new sources to `data/research-sources.yaml` before citing in research

## Validation

- YAML data files must conform to `schemas/*.schema.json`
- Run `npm run validate` to check frontmatter and data
