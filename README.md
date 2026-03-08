# Product OS

A structured product knowledge base designed for teams that use AI agents alongside human engineers and product managers. Product OS consolidates vision, features, backlog, architecture decisions, and research into a single git repository—with YAML data files for machine consumption, MDX content for human reading, and a generated site for browsing.

The core idea: product knowledge and code should stay in sync. Agents read Product OS for context before implementing, and update it when code ships. Humans review and make decisions. The repository is the contract between product and engineering.

## Feedback

Found a bug, have a feature idea, or want to improve the docs? [Open an issue](https://github.com/nakulshukla08/product-os/issues/new/choose). We have templates for bug reports, feature requests, and documentation feedback.

## Documentation

Read on the [generated site](/about-product-os) or on GitHub:

- [Why Product OS](content/about-product-os/value-proposition.mdx) — The drift problem, design principles, and how Product OS fits alongside existing tools
- [Developer Workflow](content/about-product-os/developer-workflow.mdx) — Concepts, setup, daily workflow for engineers, PR conventions
- [Product Manager Workflow](content/about-product-os/product-manager-workflow.mdx) — Defining work, writing specifications, tracking progress, delegating to agents
- [Agent Workflow](content/about-product-os/agent-workflow.mdx) — Reference for AI agents: principles, data files, update protocol
- [Agent Rules for Repos](content/about-product-os/rules-for-product-repos.mdx) — Rule content to add to each code repository (Cursor, Claude Code, Windsurf, Copilot, etc.)

## Demo: Pet Store

This repo includes a **pet store demo** to illustrate how Product OS works:

- **Domains**: Catalog (browse pets), Checkout (shopping cart), Inventory (orders)
- **Features**: Pet Catalog, Shopping Cart, Order Management — each in `data/features/{domain}.yaml`
- **Data flow**: `data/schema.yaml` defines domains → each domain maps to a feature file → features appear on the [Features](/features) dashboard

All YAML files include `# FORK:` and `# AGENTS:` comments to guide customization and agent behavior. See `data/schema.yaml` for the domain structure.

## Quick Start

Fork this repo, then:

```bash
git clone https://github.com/<your-org>/product-os.git
cd product-os
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
product-os/
├── content/          # MDX pages (product, features, backlog, research, etc.)
├── data/             # Machine-readable YAML (schema, features per domain, backlog, goals)
├── schemas/          # JSON Schema for validation
├── templates/        # Templates for new content
├── components/       # Custom MDX components (StatusBadge, FeatureTable, etc.)
└── app/              # Nextra 4 + Next.js App Router
```

## Customization (Forking / Building On)

When forking or building on Product OS, customize branding and theme in **`config/site.config.ts`**:

### Branding

| Option | Description |
|--------|-------------|
| `productName` | Your product/company name (nav, footer, page title) |
| `logo` | Image path (e.g. '/logo.svg' in `public/`) or custom React component |
| `favicon` | Optional favicon path |
| `subscript` | Footer text, e.g. "Powered by Product OS" for attribution |

### Theme

| Option | Description |
|--------|-------------|
| `theme.colors` | `primaryHue`, `primarySaturation`, `backgroundLight`, `backgroundDark` |
| `theme.customCSS` | Path to extra CSS (e.g. '/theme/override.css' in `public/`) |

**Custom CSS:** Edit `styles/custom.css` for overrides (always loaded). Use CSS variables like `--nextra-primary-hue` to customize.

### Example

```ts
// config/site.config.ts
export const branding = {
  productName: 'Acme Platform',
  logo: '/logo.svg',  // place in public/logo.svg
  subscript: 'Powered by Product OS',
}
export const theme = {
  colors: { primaryHue: 260, primarySaturation: 90 },
}
```

## Enabling Auth (Private Deployments)

1. Create a [GitHub OAuth App](https://github.com/settings/developers)
2. Copy `.env.example` to `.env.local`
3. Set `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
4. Set `GITHUB_ORG` to restrict access to org members
5. Set `NEXT_PUBLIC_AUTH_ENABLED=true`

## Deployment

Deploy to Vercel with one click. Connect your fork, add env vars if using auth, and you're done.

## License

MIT
