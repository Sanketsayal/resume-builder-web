export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />

        <p className="mt-4 text-sm text-slate-600">
          Loading your session...
        </p>
      </div>
    </div>
  );
}