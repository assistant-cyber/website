import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "ghost" | "text";
type Mode = "dark" | "light"; // dark = button sits on light bg, light = on dark bg

type CommonProps = {
  variant?: Variant;
  /** "light" produces the white-on-dark style used over dark imagery or dark sections. */
  mode?: Mode;
  /** Bronze variant of primary button — used only on the dark section 4 IF needed. Default off per spec. */
  bronze?: boolean;
  size?: "default" | "small";
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  href?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  disabled?: boolean;
};

const BASE_TEXT =
  "font-medium uppercase tracking-[0.12em] text-[12px] whitespace-nowrap transition-all duration-300 ease-out text-center select-none";

const SIZE = {
  default: "px-9 py-[14px]",
  small: "px-6 py-[10px]",
};

function variantClasses(
  variant: Variant,
  mode: Mode,
  bronze: boolean,
  fullWidth: boolean,
) {
  if (variant === "text") {
    const color =
      mode === "light"
        ? "text-white hover:text-[#b8965a]"
        : bronze
          ? "text-[#b8965a] hover:text-[#8a6e38]"
          : "text-[#1a1a1a] hover:text-[#b8965a]";
    return `${color} inline-flex items-center gap-2 ${fullWidth ? "w-full justify-center" : ""}`;
  }

  if (variant === "ghost") {
    const border = mode === "light" ? "border-white" : "border-[#1a1a1a]";
    const color = mode === "light" ? "text-white" : "text-[#1a1a1a]";
    const hover =
      mode === "light"
        ? "hover:border-[#b8965a] hover:text-[#b8965a]"
        : "hover:border-[#b8965a] hover:text-[#b8965a]";
    return `bg-transparent border ${border} ${color} ${hover} ${fullWidth ? "w-full" : ""}`;
  }

  // primary
  if (bronze) {
    return `bg-[#b8965a] text-white hover:bg-[#8a6e38] ${fullWidth ? "w-full" : ""}`;
  }
  if (mode === "light") {
    return `bg-white text-[#1a1a1a] hover:bg-[#b8965a] hover:text-white ${fullWidth ? "w-full" : ""}`;
  }
  return `bg-[#1a1a1a] text-white hover:bg-[#b8965a] ${fullWidth ? "w-full" : ""}`;
}

/**
 * Brand-consistent button. Three variants: primary, ghost, text.
 * Two modes: dark (default — sits on light backgrounds) and light (white version for dark/image backgrounds).
 *
 * Renders as <Link> when href is provided, otherwise <button>.
 */
export default function Button(props: CommonProps) {
  const {
    variant = "primary",
    mode = "dark",
    bronze = false,
    size = "default",
    fullWidth = false,
    className = "",
    children,
    href,
    onClick,
    type = "button",
    ariaLabel,
    disabled = false,
  } = props;

  const classes = [
    BASE_TEXT,
    variant === "text" ? "" : SIZE[size],
    variantClasses(variant, mode, bronze, fullWidth),
    variant === "text" ? "" : "rounded-[2px]",
    fullWidth
      ? "min-h-[44px] flex items-center justify-center"
      : "inline-flex items-center justify-center min-h-[44px]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        style={disabled ? { opacity: 0.7, pointerEvents: "none" } : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      style={disabled ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
    >
      {children}
    </button>
  );
}
