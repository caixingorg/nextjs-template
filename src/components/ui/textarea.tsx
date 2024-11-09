/**
 * @file: src/components/ui/textarea.tsx
 * @description: Custom Textarea component with consistent styling
 * @location: This file should be placed in the src/components/ui directory
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Textarea Props Interface
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Textarea Component
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-transparent",
          "px-3 py-2 text-sm ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

/**
 * Usage Example:
 * 
 * <Textarea
 *   placeholder="Type your message here."
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 * />
 */