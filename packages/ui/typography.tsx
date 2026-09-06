import * as React from "react";

// --- Display Component ---
export interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "2xl" | "xl" | "lg" | "md";
  as?: "h1" | "h2" | "h3" | "div" | "span";
}

export function Display({
  size = "xl",
  as: Component = "h1",
  className = "",
  children,
  ...props
}: DisplayProps) {
  const sizes = {
    "2xl": "text-display-2xl tracking-tighter uppercase",
    xl: "text-display-xl tracking-tight uppercase",
    lg: "text-display-lg tracking-tight",
    md: "text-display-md tracking-tight"
  };

  return (
    <Component
      className={`font-display font-extrabold text-white ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

// --- Heading Component ---
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
}

export function Heading({
  level = 2,
  className = "",
  children,
  ...props
}: HeadingProps) {
  const Tag = (`h${level}` as unknown) as React.ElementType;
  const styles = {
    1: "text-4xl font-extrabold tracking-tight text-white",
    2: "text-3xl font-bold tracking-tight text-white",
    3: "text-2xl font-semibold tracking-normal text-white",
    4: "text-xl font-medium tracking-normal text-slate-100"
  };

  return (
    <Tag className={`${styles[level]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

// --- Body Component ---
export interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "lg" | "md" | "sm";
  muted?: boolean;
}

export function Body({
  size = "md",
  muted = false,
  className = "",
  children,
  ...props
}: BodyProps) {
  const sizes = {
    lg: "text-lg md:text-xl leading-relaxed",
    md: "text-base leading-relaxed",
    sm: "text-sm leading-normal"
  };
  const color = muted ? "text-slate-400" : "text-slate-200";

  return (
    <p className={`font-sans ${sizes[size]} ${color} ${className}`} {...props}>
      {children}
    </p>
  );
}

// --- Label Component ---
export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm";
  uppercase?: boolean;
  mono?: boolean;
}

export function Label({
  size = "sm",
  uppercase = false,
  mono = false,
  className = "",
  children,
  ...props
}: LabelProps) {
  const sizeStyles = size === "xs" ? "text-[11px]" : "text-xs";
  const caseStyles = uppercase ? "uppercase tracking-widest font-semibold" : "font-medium";
  const fontStyles = mono ? "font-mono" : "font-sans";

  return (
    <span
      className={`${sizeStyles} ${caseStyles} ${fontStyles} text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
