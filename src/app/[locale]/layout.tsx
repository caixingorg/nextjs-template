/**
 * @file: src/app/[locale]/layout.tsx
 * @description: Localized layout
 */

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { LayoutProvider } from "@/components/providers/layout-provider"

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const session = await getServerSession(authOptions)

  return <LayoutProvider session={session}>{children}</LayoutProvider>
}