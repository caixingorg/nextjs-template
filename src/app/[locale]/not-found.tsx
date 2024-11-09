/**
 * @file: src/app/[locale]/not-found.tsx
 * @description: Custom 404 Not Found page
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-xl text-muted-foreground">Page Not Found</h2>
      <p className="text-center text-muted-foreground max-w-[500px]">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}