import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-400">
          404
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white">
          Page not found
        </h1>

        <p className="mt-3 text-slate-400">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900"
        >
          Go to login
        </Link>
      </div>
    </main>
  );
}