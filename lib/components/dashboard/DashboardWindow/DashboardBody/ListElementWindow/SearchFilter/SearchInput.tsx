import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: string; // Add maxWidth prop
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, maxWidth, type, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{ maxWidth }}
        className={cn(
          "flex w-full rounded-md border-none bg-transparent  text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foregrounds focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
