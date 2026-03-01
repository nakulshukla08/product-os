# Contributing to Product OS

## Adding Content

1. **Features** — Add to `data/features.yaml` and create `content/features/your-feature.mdx` (use `templates/feature.mdx.template`)
2. **Backlog items** — Add to `data/backlog.yaml` and optionally create a detailed page in `content/backlog/items/`
3. **Research** — Add sources to `data/research-sources.yaml` before citing; create reports in `content/research/`
4. **Decisions** — Use `templates/decision-record.mdx.template` for new PDRs/ADRs

## Frontmatter

All MDX files should have:

- `title` — Page title
- `category` — One of: feature, product, backlog-item, research, decision, metrics
- `last_updated` — YYYY-MM-DD

For features: `status`, `priority`, `owners`, `tags`

For backlog: `status`, `priority`, `ice` (impact, confidence, ease)

## Data Files

- Keep `data/features.yaml` and feature MDX pages in sync
- Run `npm run validate` before committing
- Ensure YAML conforms to `schemas/*.schema.json`

## Running Locally

```bash
npm install
npm run dev
```

## Validation

```bash
npm run validate
```
