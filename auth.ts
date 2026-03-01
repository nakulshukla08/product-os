import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

const GITHUB_ORG = process.env.GITHUB_ORG
const hasGitHubAuth =
  process.env.GITHUB_ID && process.env.GITHUB_SECRET

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: hasGitHubAuth
    ? [
        GitHub({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!,
          authorization: {
            params: {
              scope: 'read:user user:email read:org',
            },
          },
        }),
      ]
    : [],
  callbacks: {
    async signIn({ user, account }) {
      if (!GITHUB_ORG) return true

      const login = (user as { login?: string }).login
      if (account?.provider !== 'github' || !login) return false

      try {
        const res = await fetch(
          `https://api.github.com/orgs/${GITHUB_ORG}/members/${login}`,
          {
            headers: {
              Authorization: `Bearer ${account.access_token}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        )
        return res.status === 204
      } catch {
        return false
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token
        token.login = (profile as { login?: string }).login
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session as { accessToken?: string }).accessToken = token.accessToken as string
      }
      return session
    },
  },
  pages: {
    signIn: '/api/auth/signin',
    error: '/api/auth/error',
  },
  trustHost: true,
})
