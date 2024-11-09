/**
 * @file: src/components/providers/layout-provider.tsx
 * @description: Client-side layout provider with session
 */

"use client"

import { SessionProvider } from "next-auth/react"
import { Header } from "@/components/layout/header"
import { Toaster } from "@/components/ui/toaster"

export function LayoutProvider({
  children,
  session
}: {
  children: React.ReactNode
  session: any
}) {
  return (
    <SessionProvider session={session}>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        {children}
        <Toaster />
      </div>
    </SessionProvider>
  )
}