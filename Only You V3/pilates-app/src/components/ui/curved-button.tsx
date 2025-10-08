import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const curvedButtonVariants = cva(
  "curved-button inline-flex items-center justify-center whitespace-nowrap rounded-curved text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-800 text-primary-50 hover:bg-primary-700 hover:scale-105 active:scale-95 dark:bg-primary-600 dark:hover:bg-primary-500",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-primary-50 dark:border-primary-400 dark:text-primary-200 dark:hover:bg-primary-400 dark:hover:text-primary-900",
        secondary: "bg-secondary-800 text-secondary-50 hover:bg-secondary-700 dark:bg-secondary-600 dark:hover:bg-secondary-500",
        ghost: "hover:bg-primary-100 hover:text-primary-900 dark:hover:bg-primary-800/20 dark:hover:text-primary-200",
        link: "text-primary-800 underline-offset-4 hover:underline dark:text-primary-200",
        plan: "bg-gradient-to-r from-primary-800 to-primary-200 text-white hover:from-primary-700 hover:to-primary-100 dark:from-primary-600 dark:to-primary-300 dark:hover:from-primary-500 dark:hover:to-primary-200",
        glass: "glass-card text-primary-800 hover:bg-primary-100/20 dark:text-primary-200 dark:hover:bg-primary-800/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-curved px-3",
        lg: "h-11 rounded-curved px-8",
        xl: "h-12 rounded-curved px-10 text-base",
        icon: "h-10 w-10",
      },
      glow: {
        true: "hover-glow",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: false,
    },
  }
)

export interface CurvedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof curvedButtonVariants> {
  asChild?: boolean
}

const CurvedButton = React.forwardRef<HTMLButtonElement, CurvedButtonProps>(
  ({ className, variant, size, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(curvedButtonVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
CurvedButton.displayName = "CurvedButton"

export { CurvedButton, curvedButtonVariants }
