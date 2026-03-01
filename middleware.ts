import { NextResponse } from 'next/server'
import { auth } from '@/auth'

const AUTH_ENABLED = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'

const authMiddleware = auth((req) => {
  const isSignedIn = !!req.auth
  const isAuthRoute =
    req.nextUrl.pathname.startsWith('/api/auth') ||
    req.nextUrl.pathname === '/api/auth/error'

  if (isAuthRoute) {
    return NextResponse.next()
  }

  if (!isSignedIn) {
    const signInUrl = new URL('/api/auth/signin', req.url)
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

export default AUTH_ENABLED ? authMiddleware : () => NextResponse.next()

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images).*)'],
}
