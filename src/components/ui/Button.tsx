import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

export function Button({
  children,
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={[
        "flex w-full items-center justify-center",
        "rounded-lg bg-slate-900 px-4 py-2.5",
        "text-sm font-semibold text-white shadow-sm",
        "transition hover:bg-slate-800",
        "focus:outline-none focus:ring-2",
        "focus:ring-slate-900/20 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      ].join(" ")}
    >
      {loading && (
        <span
          className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
      )}

      {loading ? "Signing in..." : children}
    </button>
  );
}
