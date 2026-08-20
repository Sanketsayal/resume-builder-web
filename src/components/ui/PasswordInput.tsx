import { useState } from "react";
import type { InputHTMLAttributes } from "react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function PasswordInput({
  label,
  error,
  id,
  className = "",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      </div>

      <div className="relative mt-2">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          {...props}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={[
            "block w-full rounded-lg border px-3 py-2.5 pr-16",
            "text-sm text-slate-900 shadow-sm outline-none",
            "placeholder:text-slate-400 transition",
            "focus:ring-2",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-300 focus:border-slate-900 focus:ring-slate-900/10",
            className,
          ].join(" ")}
        />

        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute inset-y-0 right-3 my-auto h-fit text-sm font-medium text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
