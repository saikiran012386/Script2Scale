import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className = "",
  variant = "default",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-mono font-semibold rounded-full border tracking-wide uppercase";

  const variants = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    brand: "bg-emerald-950/80 text-emerald-400 border-emerald-800/80",
    success: "bg-emerald-950 text-emerald-400 border-emerald-800",
    warning: "bg-amber-950/80 text-amber-400 border-amber-800/80",
    danger: "bg-red-950/80 text-red-400 border-red-800/80",
    outline: "bg-transparent text-slate-300 border-slate-700"
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </span>
  );
}
