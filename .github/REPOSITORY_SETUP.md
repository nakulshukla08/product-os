# Repository Setup (for maintainers)

This guide explains how to configure branch protection so that PRs require code owner approval before merging.

## Prerequisites

- You must have admin access to the repository
- The `CODEOWNERS` file must exist on the default branch (e.g. `main`)

## Enable branch protection

1. Go to **Settings** → **Branches** → **Add branch protection rule** (or edit the existing rule for `main`)
2. Set **Branch name pattern** to `main` (or your default branch)
3. Enable:
   - **Require a pull request before merging**
   - **Require approvals** — set to 1 (or more)
   - **Require review from Code Owners** — check this box
4. (Optional) **Do not allow bypassing the above settings** — prevents admins from merging without approval
5. Save the rule

Once configured, PRs cannot be merged until a code owner (defined in `CODEOWNERS`) approves.

## Customizing CODEOWNERS

Edit `.github/CODEOWNERS` to change who owns what:

```
# Entire repo
* @username

# Specific paths
/data/ @username
/config/ @username
/.github/ @username @teammate

# Teams (org repos only)
* @org/team-name
```

Code owners must have write access to the repository. For org repos, use `@org/team-name` for teams.
