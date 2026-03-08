# Setup Guide

Product OS is designed to be forked. Use this guide to publish your fork and deploy it.

## 1. Fork and Clone

1. Fork [nakulshukla08/product-os](https://github.com/nakulshukla08/product-os) to your GitHub account or organization
2. Clone your fork:

```bash
git clone https://github.com/YOUR_ORG_OR_USER/product-os.git
cd product-os
```

## 2. Update Repository Links (Optional)

If you forked to a different org or user, update the repository URL in `config/site.config.ts`:

```ts
export const repository = 'https://github.com/YOUR_ORG_OR_USER/product-os'
```

This updates the "Edit on GitHub" links, project icon, and feedback links across the site.

## 3. Replace Example Content

Replace the example data with your product:

- `data/schema.yaml` — Domain→file mapping; define your domains here
- `data/features/*.yaml` — Features per domain (e.g. `catalog.yaml`, `checkout.yaml`)
- `data/backlog.yaml` — Your backlog items
- `data/goals.yaml` — Your strategic goals
- `data/repositories.yaml` — Your code repositories
- `content/features/*.mdx` — Feature specifications
- `content/product/*.mdx` — Vision, pitch, value proposition
- `config/site.config.ts` — Branding (productName, logo, theme)

## 4. Deploy to Vercel

1. Import your fork in [Vercel](https://vercel.com)
2. Deploy. The default build command (`npm run build`) includes the Pagefind postbuild for search.

### Optional: Enable Auth (Private Deployments)

To restrict access to your org members:

1. Create a [GitHub OAuth App](https://github.com/settings/developers)
2. Copy `.env.example` to `.env.local` (or set env vars in Vercel)
3. Set:
   - `GITHUB_ID` — OAuth App Client ID
   - `GITHUB_SECRET` — OAuth App Client Secret
   - `NEXTAUTH_SECRET` — Random secret (e.g. `openssl rand -base64 32`)
   - `NEXTAUTH_URL` — Your deployment URL
   - `GITHUB_ORG` — Your GitHub org (for org-only access)
   - `NEXT_PUBLIC_AUTH_ENABLED` — `true`
4. OAuth callback URL: `https://YOUR_VERCEL_URL/api/auth/callback/github`

## 5. Add Agent Rules to Product Repos

Add the Product OS rule to each code repository that implements your product. See [Agent Rules for Repos](content/about-product-os/rules-for-product-repos.mdx) for the content and placement instructions.
