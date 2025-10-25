import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "glow";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "outline", ...props }, ref) => {
    const styles =
      variant === "glow"
        ? "border border-cyan-300/60 bg-cyan-400/10 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.4)]"
        : "border border-white/15 bg-white/5 text-white/70";
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.35em]",
          styles,
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
