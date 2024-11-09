/**
 * @file: src/components/dashboard/nav.tsx
 * @description: Dashboard sidebar navigation
 */

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Overview",
    href: "/dashboard",
  },
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Settings",
    href: "/settings",
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const isActive = pathname.endsWith(item.href)
        return (
          <Link
            key={item.href}
            href={`/en${item.href}`}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium",
              "hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}