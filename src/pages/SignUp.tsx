import { Link } from "react-router-dom";

export function SignUp() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Create account
        </h1>

        <p className="mt-2 text-slate-600">
          Registration page coming next.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block text-sm font-semibold text-slate-900 hover:underline"
        >
          ← Back to login
        </Link>
      </div>
    </main>
  );
}