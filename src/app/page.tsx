/**
 * @file: src/app/[locale]/page.tsx
 * @description: Home page component
 */

import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Button } from "@/components/ui/button"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Our App</h1>
      <p className="text-xl text-muted-foreground">
        A modern web application built with Next.js
      </p>
      
      {session?.user ? (
        <div className="space-y-4">
          <p className="text-lg">
            Welcome back, <span className="font-bold">{session.user.name}</span>
          </p>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="space-x-4">
          <Button asChild variant="default">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  )
}