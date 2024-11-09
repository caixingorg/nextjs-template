/**
 * @file: src/app/[locale]/(dashboard)/dashboard/page.tsx
 * @description: Dashboard main page
 */

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-muted-foreground">
            {session?.user?.name}
          </p>
          <p className="text-muted-foreground">
            {session?.user?.email}
          </p>
        </div>
      </div>
    </div>
  )
}