import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { PasswordInput } from "../components/ui/PasswordInput";

import { useAuth } from "../hooks/useAuth";
import { loginSchema, type LoginFormValues } from "../validations/LoginSchema";

interface LoginLocationState {
  from?: {
    pathname: string;
    search?: string;
    hash?: string;
  };
}

export function LoginPage() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const state = location.state as LoginLocationState | null;

  const redirectTo = state?.from
    ? `${state.from.pathname}${state.from.search ?? ""}${state.from.hash ?? ""}`
    : "/dashboard";

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values);

      navigate(redirectTo, {
        replace: true,
        state: null,
      });
    } catch {
      // We'll improve error handling later.
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          {/* Brand */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                R
              </div>

              <span className="text-xl font-bold tracking-tight text-slate-900">
                ResumeBuilder
              </span>
            </Link>

            <h1 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Sign in to continue to your account.
            </p>
          </div>

          {/* Card */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <Input
                id="email"
                label="Email address"
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <PasswordInput
                id="password"
                label="Password"
                autoComplete="current-password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-slate-900 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" loading={isSubmitting}>
                Sign in
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-slate-900 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-slate-700">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline hover:text-slate-700">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
