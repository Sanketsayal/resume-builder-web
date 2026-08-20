import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        id={id}
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={[
          "mt-2 block w-full rounded-lg border px-3 py-2.5",
          "text-sm text-slate-900 shadow-sm outline-none",
          "placeholder:text-slate-400 transition",
          "focus:ring-2",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
            : "border-slate-300 focus:border-slate-900 focus:ring-slate-900/10",
          className,
        ].join(" ")}
      />

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
