/**
 * @file: src/components/providers/providers.tsx
 * @description: Client-side providers wrapper component
 */

"use client"

import { SessionProvider } from "next-auth/react"

interface ProvidersProps {
  children: React.ReactNode
  session: any // 使用实际的会话类型
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}