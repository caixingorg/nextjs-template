/**
 * @file: src/app/[locale]/(dashboard)/layout.tsx
 * @description: Dashboard layout
 */

import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardNav } from "@/components/dashboard/nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/en/login")
  }

  return (
    <div className="flex-1 flex flex-col space-y-6">
      <header className="sticky top-16 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}