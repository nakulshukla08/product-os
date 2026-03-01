# Product OS

An opinionated framework for product management of modern tech products. Keep a bird's-eye view of your product—vision, features, backlog, research, and decisions—in one structured, agent-friendly knowledge base.

## Why Product OS?

Solo developers and small teams struggle to maintain a coherent view across multiple repos, specs, and docs. Product OS gives you:

- **Single source of truth** — All product knowledge in one place
- **Agent-friendly structure** — YAML data files and frontmatter for AI workflows
- **Structured, not sprawl** — Clear sections: Product, Features, Architecture, Backlog, Research, Decisions, Metrics
- **Optional access control** — Protect IP with GitHub OAuth (org members only)

## Quick Start

```bash
# Clone (after creating the repo on GitHub)
git clone https://github.com/winspect-labs/product-os.git
cd product-os
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**First-time setup:** Create a new public repo (e.g. `winspect-labs/product-os`), then push:

```bash
git remote add origin https://github.com/winspect-labs/product-os.git
git push -u origin main
```

## Structure

```
product-os/
├── content/          # MDX pages (product, features, backlog, research, etc.)
├── data/             # Machine-readable YAML (features, backlog, repos, sources)
├── schemas/          # JSON Schema for validation
├── templates/        # Templates for new content
├── components/       # Custom MDX components (StatusBadge, FeatureTable, etc.)
└── app/              # Nextra 4 + Next.js App Router
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
