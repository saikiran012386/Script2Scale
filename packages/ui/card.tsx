import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "glass";
}

export function Card({ className = "", variant = "default", children, ...props }: CardProps) {
  const baseStyles = "rounded-xl p-6 shadow-sm";
  const variants = {
    default: "bg-slate-900 text-slate-100",
    bordered: "bg-slate-900 border border-slate-800 text-slate-100",
    glass: "bg-slate-900/60 backdrop-blur-md border border-slate-800/80 text-slate-100"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`mb-4 ${className}`} {...props}>{children}</div>;
}

export function CardTitle({ className = "", children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`text-xl font-semibold tracking-tight text-white ${className}`} {...props}>{children}</h3>;
}

export function CardContent({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props}>{children}</div>;
}
