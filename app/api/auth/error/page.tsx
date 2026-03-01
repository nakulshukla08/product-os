'use client'

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
        Access Denied
      </h1>
      <p className="mt-4 text-center text-slate-600 dark:text-slate-400">
        You must be a member of the configured GitHub organization to access
        this site. If you believe this is an error, contact the repository
        owner.
      </p>
    </div>
  )
}
