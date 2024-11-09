/**
 * @file: src/app/layout.tsx
 * @description: Root layout with required HTML tags
 */

import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        {children}
      </body>
    </html>
  )
}