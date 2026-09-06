import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "magnetic-fill";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group";
    
    const variants = {
      primary: "bg-brand-orange text-white hover:bg-brand-orange-dark focus:ring-brand-orange shadow-md shadow-brand-orange/20 font-bold",
      secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-brand-yellow border border-slate-700",
      outline: "border border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-brand-yellow/50 focus:ring-brand-yellow",
      ghost: "text-slate-300 hover:bg-slate-800 hover:text-white focus:ring-brand-yellow",
      danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500",
      "magnetic-fill": "bg-brand-black text-brand-yellow border border-brand-yellow/40 hover:text-brand-black focus:ring-brand-yellow shadow-lg font-bold"
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {variant === "magnetic-fill" && (
          <span className="absolute inset-0 bg-brand-yellow transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-0" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
