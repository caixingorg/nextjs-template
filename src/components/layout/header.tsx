/**
 * @file: src/components/layout/header.tsx
 * @description: Global header component
 */

"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function Header() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold">
            Your App
          </Link>
          {session?.user && (
            <nav className="hidden md:flex space-x-4">
              <Link href="/en/dashboard" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/en/profile" className="text-muted-foreground hover:text-foreground">
                Profile
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : session?.user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {session.user.email}
              </span>
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/en/login" })}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/en/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/en/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}