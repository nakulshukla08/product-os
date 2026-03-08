# Product OS — Value Proposition

## Built for Agents, by Agents

Product OS is **agent-first**. We assume most of the work—specification, implementation, status updates—is done by agents. Humans stay aware and review; agents do the heavy lifting.

- **Agents get context** — Read `data/features/*.yaml`, `data/backlog.yaml`, `data/schema.yaml`, and content before implementing.
- **Agents update** — When code ships, agents update Product OS. No manual drift.
- **PMs use agents** — Product managers use agents for specification workflow. Enhanced productivity. Code and product definition move closer together.

## Kill the Drift

The gap between product goals/specifications and actual development is where projects fail. Product OS closes that gap:

- **Single source of truth** — Specs and code stay aligned because agents maintain both.
- **Augment, don't replace** — Jira, Linear, and other tools augment Product OS. They link to it, sync from it, or feed into it. We don't eliminate them; we make Product OS the canonical layer.
- **No manual status updates** — Agents update Product OS when they ship. Drift dies.

## Who Benefits? (Via Agents)

### Engineers

| Benefit | How Product OS Delivers It |
|---------|----------------------------|
| **Context without hunting** | Agents load Product OS automatically. One place for vision, features, architecture, decisions. |
| **Clear "what to build"** | Agents read `data/backlog.yaml` and `data/features/*.yaml`. Priorities and status are always current. |
| **No manual updates** | Agents update Product OS when features ship. Engineers review, not maintain. |
| **Decision history** | PDR/ADR records explain *why*. Agents reference them; humans approve. |

### Product Managers

| Benefit | How Product OS Delivers It |
|---------|----------------------------|
| **Specification via agents** | PMs use agents to write specs, prioritize backlog, link to goals. No manual Jira wrangling. |
| **Code closer to product** | Agents keep Product OS in sync with reality. Specs and code align. |
| **Review, not maintain** | PMs review agent-proposed updates. Approve. Stay aware via the live site. |
| **Augment Jira** | Use Jira/Linear to augment—not replace—Product OS. Link, sync, or feed. |

## Before vs After

| Before Product OS | After Product OS |
|-------------------|-------------------|
| Specs drift from code. Manual updates. | Agents update Product OS when they ship. No drift. |
| PMs manually maintain Jira + Confluence | PMs use agents for specs. Jira augments Product OS. |
| "Where's the spec?" / "What's the priority?" | Agents read `data/backlog.yaml`, `data/features/*.yaml`. Always current. |
| 5+ tools, no single truth | Product OS is canonical. Tools augment it. |

## How It Works

1. **Agents read** — Before implementing, agents load Product OS context.
2. **Agents implement** — Code changes in product repos.
3. **Agents update** — When code ships, agents create PRs to update Product OS.
4. **Humans review** — Approve agent PRs. Stay aware. Use Jira/Linear to augment.
