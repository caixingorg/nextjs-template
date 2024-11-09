/**
 * @file: src/components/providers/session-provider.tsx
 * @description: Client component wrapper for SessionProvider
 */

"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}