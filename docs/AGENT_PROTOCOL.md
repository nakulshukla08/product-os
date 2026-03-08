# Product OS — Agent Protocol

This document formalizes how agents read and modify Product OS specs. It defines the data model, read operations, write path, lifecycle rules, and conflict handling.

## Data Model

Reference `data/schema.yaml` for the canonical structure of:

- **Goals** — Strategic objectives (OKRs)
- **Features** — Product capabilities with status, priority, completion
- **Backlog items** — Prioritized work items with ICE scores
- **OKRs** — Objectives and key results
- **Domains** — Each domain has many features; maps to `data/features/{domain}.yaml`

## Read Operations

### What to Load Before Implementing

| Data | Purpose |
|------|---------|
| `data/schema.yaml` | Structure reference; domain → file mapping |
| `data/features/*.yaml` | Current features, status, repos, goal_ids |
| `data/backlog.yaml` | Prioritized work; ICE scores; goal_ids |
| `data/goals.yaml` | Strategic goals |
| `content/features/{id}.mdx` | Feature specification, user stories, scope |
| `content/decisions/` | Architecture and product decision records |

### MCP Tools (Read-Only)

When Product OS is available as an MCP server:

- `product_os_list_features` — List features (optional filters: status, priority, domain)
- `product_os_get_feature` — Get feature by id
- `product_os_list_backlog` — List backlog items
- `product_os_get_backlog_item` — Get backlog item by id
- `product_os_list_goals` — List goals
- `product_os_get_schema` — Get unified schema

### Resources

- `product-os://data/features` — Merged features JSON
- `product-os://data/backlog` — Backlog JSON
- `product-os://data/goals` — Goals JSON
- `product-os://data/schema` — Schema YAML
- `product-os://content/features/{id}` — Feature spec MDX

## Write Path

**MCP has no write tools.** When changes are needed:

1. **Agent edits files directly** in the workspace (`data/*.yaml`, `content/**/*.mdx`)
2. **User runs** `npm run product-os:create-pr` to create branch, commit, and open PR
3. **PR uses** [.github/PULL_REQUEST_TEMPLATE.md](../.github/PULL_REQUEST_TEMPLATE.md)

The agent should summarize files changed and the changes made, then prompt the user to run the CLI.

## Lifecycle Rules

### Backlog Item Status

```
proposed → approved → in-progress → shipped
                   ↘ deferred
```

### Feature Status

```
planned → in-progress → shipped
                    ↘ deprecated
```

### Goal Status

```
active → accomplished
```

## Conflict Handling

If a user request contradicts Product OS (e.g. building a deprecated feature, ignoring a recorded decision):

1. **Surface the conflict** — Tell the user what Product OS says
2. **Suggest alignment** — Propose updating Product OS or changing the request
3. **Do not silently proceed** — Never implement something that conflicts with recorded decisions

## MCP Tool Mapping

| Protocol Operation | MCP Tool / Resource |
|--------------------|---------------------|
| Load features | `product_os_list_features`, `product_os_get_feature`, `product-os://data/features` |
| Load backlog | `product_os_list_backlog`, `product_os_get_backlog_item`, `product-os://data/backlog` |
| Load goals | `product_os_list_goals`, `product-os://data/goals` |
| Load schema | `product_os_get_schema`, `product-os://data/schema` |
| Load feature spec | `product-os://content/features/{id}` |
| Update data | (None — edit files directly) |
