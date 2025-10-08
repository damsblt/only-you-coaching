import * as React from "react"
import { cn } from "@/lib/utils"

export interface CurvedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'plan'
  planType?: 'starter' | 'pro' | 'expert' | 'essentiel' | 'avance' | 'premium'
  hover?: boolean
  glow?: boolean
}

const CurvedCard = React.forwardRef<HTMLDivElement, CurvedCardProps>(
  ({ className, variant = 'default', planType, hover = true, glow = false, ...props }, ref) => {
    const baseClasses = "curved-card"
    const variantClasses = {
      default: "bg-card text-card-foreground border dark:bg-dark-card dark:text-dark-text-primary dark:border-dark-border",
      glass: "glass-card border-white/20 dark:border-white/10",
      gradient: "bg-gradient-to-br from-primary-200/50 to-primary-800/50 dark:from-primary-200/20 dark:to-primary-800/20",
      plan: planType ? `gradient-${planType} border-${planType} dark:bg-dark-card dark:border-dark-border` : "bg-card dark:bg-dark-card"
    }
    const hoverClasses = hover ? "hover-lift" : ""
    const glowClasses = glow ? "hover-glow" : ""

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          hoverClasses,
          glowClasses,
          className
        )}
        {...props}
      />
    )
  }
)
CurvedCard.displayName = "CurvedCard"

export { CurvedCard }
