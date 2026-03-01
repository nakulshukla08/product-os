# Product OS — Agent Interaction Guide

This repository is designed for AI agents to read, reason about, and recommend product decisions. Follow these guidelines when interacting with Product OS.

## Data Sources (Machine-Readable)

### Primary Data Files

| File | Purpose | Use For |
|------|---------|---------|
| `data/features.yaml` | Feature registry with status, priority, completion | Feature status reports, gap analysis |
| `data/backlog.yaml` | Prioritized backlog with ICE scores | What to build next, prioritization |
| `data/repositories.yaml` | Repo map, tech stack, ownership | Architecture overview, dependency mapping |
| `data/research-sources.yaml` | Cited sources for research | Fact-checking, traceability |
| `data/roadmap.yaml` | Timeline-based roadmap | Timeline alignment |

### How to Read Data

1. **Features:** Parse `data/features.yaml` for the full feature list. Each feature has `id`, `name`, `status`, `priority`, `completion`, `repos`.
2. **Backlog:** Parse `data/backlog.yaml` for ordered items. ICE scores (impact, confidence, ease) indicate priority.
3. **Research:** Parse `data/research-sources.yaml` for cited sources. Reference by `id` in research reports.

## Content Structure

- **Product** — Vision, pitch, value prop, target audience
- **Features** — Per-feature MDX pages + `data/features.yaml`
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
2. Read `data/features.yaml` — identify gaps (low completion, blocked features)
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
