import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold">Welcome to Our App</h1>
        <p className="text-xl text-muted-foreground">
          A modern web application built with Next.js 13
        </p>
        
        {session?.user ? (
          // 已登录用户看到的内容
          <div className="space-y-4">
            <p className="text-lg">
              Welcome back, <span className="font-bold">{session.user.name}</span>
            </p>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        ) : (
          // 未登录用户看到的内容
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
    </div>
  )
}