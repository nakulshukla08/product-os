# Setup Guide

The Product OS template is ready. Complete these steps to publish and use it.

## 1. Create the Public product-os Repo

Create a new **public** repository on GitHub:

- **Option A (winspect-labs):** `winspect-labs/product-os` (requires org admin)
- **Option B (personal):** `nakulshukla08/product-os`

Then push:

```bash
cd /Users/nakulshukla/Documents/Source/product-os
git remote add origin https://github.com/YOUR_ORG_OR_USER/product-os.git
git push -u origin main
```

## 2. Fork into Private winspect-product-hub

1. Go to the product-os repo on GitHub
2. Click **Fork**
3. Create the fork as **winspect-labs/winspect-product-hub**
4. Make it **Private**
5. Clone the fork locally and replace example content with Winspect data (see Phase 2 in the plan)

## 3. Deploy winspect-product-hub to Vercel

1. Import the `winspect-labs/winspect-product-hub` repo in Vercel
2. Add environment variables:
   - `GITHUB_ID` — GitHub OAuth App Client ID
   - `GITHUB_SECRET` — GitHub OAuth App Client Secret
   - `NEXTAUTH_SECRET` — Random secret (e.g. `openssl rand -base64 32`)
   - `NEXTAUTH_URL` — Your Vercel URL (e.g. `https://hub.winspect.io`)
   - `GITHUB_ORG` — `winspect-labs`
   - `NEXT_PUBLIC_AUTH_ENABLED` — `true`
3. Create a GitHub OAuth App at https://github.com/settings/developers
   - Callback URL: `https://YOUR_VERCEL_URL/api/auth/callback/github`

## 4. Seed Winspect Content (Phase 2)

In the winspect-product-hub fork, replace example content:

- `data/features.yaml` — Real Winspect features (API Catalog, K8s Discovery, RAG Search, etc.)
- `data/repositories.yaml` — Real repos (api-management-ui, platform-backend-service, etc.)
- `data/backlog.yaml` — Real backlog items
- Feature MDX pages — Real descriptions and status
- `CLAUDE.md` — Winspect-specific agent instructions
