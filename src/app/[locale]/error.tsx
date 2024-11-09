/**
 * @file: src/app/[locale]/error.tsx
 * @description: Error page component
 */

"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以在这里添加错误日志记录
    console.error(error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <p className="text-center text-muted-foreground max-w-[500px]">
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          Return Home
        </Button>
      </div>
    </div>
  )
}