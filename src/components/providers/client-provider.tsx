/**
 * @file: src/components/providers/client-provider.tsx
 * @description: Client-side providers wrapper
 */

"use client"

import { SessionProvider } from "next-auth/react"

export function ClientProvider({
  children,
  session
}: {
  children: React.ReactNode
  session: any
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}